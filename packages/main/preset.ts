import { resolve } from 'path'
import { readdir } from 'fs/promises'
import { app } from 'electron'
import { TinyEmitter } from 'tiny-emitter'
import { AnalysisPlugin } from './api/core'

// 存储全局的状态和插件参数
const pkg = (process.env as any).pkg
global.$state = {
	cacheDir: resolve(app.getPath('temp'), './' + pkg.name),
	library: {
		git: null,
		node: null,
		pnpm: null,
		yarn: null,
	},
	plugins: [],
}
// 后台的全局事件总线
global.$bus = new TinyEmitter()

export async function usePreset() {
	const dir = await readdir(global.$state.cacheDir)
	const tasks = dir
		.map(plugin => {
			const location = resolve(global.$state.cacheDir, plugin)
			return AnalysisPlugin(location).catch(e => null)
		})
		.filter(item => item)
	const plugins = await Promise.all(tasks)
	global.$state.plugins = plugins
	console.log(plugins)
}
