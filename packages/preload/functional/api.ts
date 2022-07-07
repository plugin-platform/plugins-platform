import { ipcRenderer, contextBridge, shell } from 'electron'
import * as os from 'os'

export function useRendererApi() {
	const invoke = (type, data?: any) => ipcRenderer.invoke('msg-trigger', { type, data })
	const sendSync = (type, data?: any) => ipcRenderer.sendSync('msg-trigger', { type, data })

	const simplifyApi = pp => {
		const keys = [
			'getAppList', // 获取安装的插件列表
			'getConfig', // 获取应用设置
			'getPath', // 获取app位置
			'hasNode', // 验证node环境
			'hasPnpm', // 验证pnpm
			'hasYarn', // 验证yarn
			'hasGit', // 验证git
			'hideMainWindow', // 隐藏主窗口
			'installPlugin', // 安装插件
			'showMainWindow', // 显示主窗口
			'setWindowSize', // 设置窗口大小
			'startup', // 开机启动
			'shellBeep',
		]
		keys.forEach(item => {
			pp[item] = params => invoke(item, params)
		})
	}

	const pp: any = {
		hooks: {},
		onPluginReady(cb) {
			typeof cb === 'function' && (pp.hooks.onPluginEnter = cb)
		},
		moveMainWindow(params) {
			return ipcRenderer.send('move-window', params)
		},
		showNotification(body, clickFeatureCode) {
			return invoke('showNotification', { body, clickFeatureCode })
		},
		copyImage(img) {
			return invoke('copyImage', { img })
		},
		copyText(text) {
			return invoke('copyText', { text })
		},
		copyFile: file => {
			return invoke('copyFile', { file })
		},
		db: {
			put: data => invoke('dbPut', { data }),
			get: id => invoke('dbGet', { id }),
			getSync: id => sendSync('dbGetSync', { id }),
			remove: doc => invoke('dbRemove', { doc }),
			bulkDocs: docs => invoke('dbBulkDocs', { docs }),
			allDocs: key => invoke('dbAllDocs', { key }),
		},
		dbStorage: {
			setItem: async (key, value) => {
				const target = { _id: String(key) } as any
				const result = await invoke('dbGet', { id: target._id })
				result && (target._rev = result._rev)
				target.value = value
				const res = await invoke('dbPut', { data: target })
				if (res.error) throw new Error(res.message)
			},
			getItem: async key => {
				const res = await invoke('dbGet', { id: key })
				return res && 'value' in res ? res.value : null
			},
			removeItem: async key => {
				const res = await invoke('dbGet', { id: key })
				res && (await invoke('dbRemove', { doc: res }))
			},
		},

		shellOpenExternal(url) {
			shell.openExternal(url)
		},
		shellOpenPath(path) {
			shell.openPath(path)
		},

		isMacOs() {
			return os.type() === 'Darwin'
		},

		isWindows() {
			return os.type() === 'Windows_NT'
		},

		isLinux() {
			return os.type() === 'Linux'
		},
	}

	simplifyApi(pp)

	contextBridge.exposeInMainWorld('pp', pp)
}
