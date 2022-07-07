import { app } from 'electron'
import { resolve, basename, extname } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { spawn } from 'child_process'

enum InstallMode {
	git = 'git',
	local = 'local',
}
interface InstallParams {
	mode: InstallMode
	url: string
}

export async function installPlugin(options: TransferType<InstallParams>) {
	existsSync(global.$state.cacheDir) || mkdirSync(global.$state.cacheDir)
	switch (options.data.mode) {
		case InstallMode.git: {
			await GitClone(options.data).catch(e => console.log(e))
			break
		}
	}
}

async function GitClone(option: InstallParams) {
	const hasGit = await global.$state.library.git
	if (!hasGit) {
		return false
	}
	const filename = basename(option.url, extname(option.url))
	const location = resolve(global.$state.cacheDir, filename)
	if (existsSync(location)) {
		return Promise.resolve()
	}
	await new Promise((resolve, reject) => {
		const progress = spawn('git', [`clone ${option.url}`], {
			windowsHide: true,
			cwd: global.$state.cacheDir,
			shell: true,
		})
		progress.stdout.on('error', data => reject(data.toString()))
		progress.on('close', () => resolve(true))
	})
	const pkgJson = resolve(location, './package.json')
	const str = await readFile(pkgJson, 'utf-8')
	const info = JSON.parse(str) as PluginPackageJSON
	info.source = option.url
	await writeFile(pkgJson, JSON.stringify(info, null, '\t'), 'utf-8')
}

export async function AnalysisPlugin(location: string): Promise<PluginInformation> {
	const pkgJson = resolve(location, './package.json')
	const exist = existsSync(location) && existsSync(pkgJson)
	if (!exist) {
		return Promise.reject('插件路径或package.json不存在')
	}
	const str = await readFile(pkgJson, 'utf-8')
	const info = JSON.parse(str) as PluginPackageJSON
	return {
		name: info.pluginName,
		logo: info.logo,
		description: info.description,
		homepage: info.homepage,
		author: info.author,
		location: location,
		source: info.source,
		type: info.pluginType,
		hotKey: info.hotKey || [],
	}
}
