import { BrowserWindow, BrowserWindowConstructorOptions, WebPreferences, app } from 'electron'
import { join } from 'path'

interface WindowMap {
	[key: string]: BrowserWindow | null
}
interface Pool {
	[key: string]: BrowserWindow[]
}

export enum ConfigTypes {
	WindowConfig,
	ModalWindowConfig,
}

interface PoolSchemaOptions {
	limit?: number
	page: string
	config: ConfigTypes
}
interface WindowConstructorOptions extends BrowserWindowConstructorOptions {
	page: string
	uniqueId: string
}
class WindowConfig implements BrowserWindowConstructorOptions {
	maximizable = true
	resizable = true
	center = true
	frame = false
	show = false
	movable = true
	transparent = true
	webPreferences = new ConfigWebPreferences()
}
class ModalWindowConfig implements BrowserWindowConstructorOptions {
	maximizable = false
	resizable = false
	center = true
	frame = false
	show = false
	movable = true
	transparent = true
	modal = true
	parent = undefined
	webPreferences = new ConfigWebPreferences()
}
class ConfigWebPreferences implements WebPreferences {
	nodeIntegration = true
	contextIsolation = false
	preload = join(__dirname, '../preload/index.cjs')
}

const EmptyFunction = () => {}

class WindowManager {
	private pool: Pool
	private UsedWindow: WindowMap
	private SchemaCollection: PoolSchemaOptions[]
	constructor() {
		this.pool = {}
		this.UsedWindow = {}
		this.SchemaCollection = []
	}
	prepare(SchemaCollection: PoolSchemaOptions[]) {
		this.SchemaCollection = SchemaCollection
		SchemaCollection.forEach(schema => {
			const limit = this.isNotEmpty(schema.limit) ? Number(schema.limit) : 3
			if (!this.pool[schema.page]) {
				this.pool[schema.page] = []
			}
			const target = this.pool[schema.page]
			while (target.length < limit) {
				const win = this.generateWindow(schema.config, schema.page)
				target.push(win)
			}
		})
	}
	generateWindow(conf: ConfigTypes, page: string) {
		const config = this.getDefaultConfig(conf)
		if (!config) {
			throw new Error('无法识别的schema.config:' + conf)
		}
		const win = new BrowserWindow(config)
		if (app.isPackaged) {
			win.loadURL(`app://./${page}.html/#`).catch(EmptyFunction)
		} else {
			const url =
				`http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}/` + page + '/#'
			win.loadURL(url).catch(EmptyFunction)
		}
		return win
	}
	getDefaultConfig(type: ConfigTypes) {
		switch (type) {
			case ConfigTypes.WindowConfig:
				return new WindowConfig()
			case ConfigTypes.ModalWindowConfig:
				return new ModalWindowConfig()
		}
	}
	getUnUsedWindow(page: string) {
		let win = this.pool[page].shift()
		if (!win) {
			const schema = this.SchemaCollection.find(item => item.page === page)
			if (!schema) {
				throw new Error('找不到对应类型的窗口模板')
			}
			win = this.generateWindow(schema.config, schema.page)
		}
		this.prepare(this.SchemaCollection)
		return win
	}
	createWindow(options: WindowConstructorOptions): BrowserWindow {
		const win = this.getUnUsedWindow(options.page)
		this.UsedWindow[options.uniqueId] = win
		win.on('close', () => {
			this.UsedWindow[options.uniqueId] = null
			delete this.UsedWindow[options.uniqueId]
		})
		options.width && options.height && win.setSize(options.width as number, options.height as number, true)
		this.isNotEmpty(options.resizable) && win.setResizable(options.resizable as boolean)
		this.isNotEmpty(options.movable) && win.setMovable(options.movable as boolean)
		this.isNotEmpty(options.alwaysOnTop) && win.setAlwaysOnTop(options.alwaysOnTop as boolean)
		this.isNotEmpty(options.center) && options.center && win.center()
		;(this.isNotEmpty(options.x) || this.isNotEmpty(options.y)) &&
			win.setPosition(options.x || 1, options.y || 1, true)
		this.isNotEmpty(options.minWidth) && win.setMinimumSize(options.minWidth as number, options.minHeight || 0)
		this.isNotEmpty(options.minHeight) && win.setMinimumSize(options.minWidth || 0, options.minHeight as number)
		this.isNotEmpty(options.maxWidth) && win.setMaximumSize(options.maxWidth as number, options.maxHeight || 0)
		this.isNotEmpty(options.maxHeight) && win.setMaximumSize(options.maxWidth || 0, options.maxHeight as number)
		this.isNotEmpty(options.parent) && win.setParentWindow(options.parent as BrowserWindow)
		this.isNotEmpty(options.show) && options.show && win.show()
		if (options.modal && options.parent) {
			// 当窗口是模态窗时,禁用其父窗口
			options.parent.setEnabled(false)
			win.once('close', () => {
				;(options.parent as BrowserWindow).setEnabled(true)
			})
		}
		win.webContents.send('set-window-id', options.uniqueId)
		return win
	}
	getWindowByUniqueId(uniqueId: string) {
		return this.UsedWindow[uniqueId]
	}
	isNotEmpty(value: any): boolean {
		return value !== undefined && value !== null
	}
}

export const WindowsManager = new WindowManager()
