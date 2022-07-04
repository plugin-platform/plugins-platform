import { app } from 'electron'
import { resolve, basename, extname } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { spawn } from 'child_process'

const config = global.config

enum InstallMode {
	git = 'git',
	local = 'local',
}
interface InstallParams {
	mode: InstallMode
	url: string
}

export async function installPlugin(options: TransferType<InstallParams>) {
	existsSync(config.cacheDir) || mkdirSync(config.cacheDir)
	switch (options.data.mode) {
		case InstallMode.git: {
			await GitClone(options.data).catch(e => console.log(e))
			break
		}
	}
}

async function GitClone(option: InstallParams) {
	const hasGit = await config.library.git
	if (!hasGit) {
		return false
	}
	const filename = basename(option.url, extname(option.url))
	const pluginDir = resolve(config.cacheDir, filename)
	if (existsSync(pluginDir)) {
		return Promise.resolve()
	}
	return new Promise((resolve, reject) => {
		const progress = spawn('git', [`clone ${option.url}`], {
			windowsHide: true,
			cwd: config.cacheDir,
			shell: true,
		})
		progress.stdout.on('error', data => reject(data.toString()))
		progress.on('close', () => resolve(true))
	})
}
