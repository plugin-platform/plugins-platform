import { app, BrowserWindow, shell } from 'electron'
import { WindowsManager, ConfigTypes } from './libs/WindowsManager'
import { join } from 'path'

export function createMainWindow(): BrowserWindow {
	setWindowThreadPoolParameters()
	const win = WindowsManager.createWindow({
		page: 'index',
		uniqueId: 'index',
		title: 'Main window',
		show: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	})

	if (app.isPackaged) {
		win.loadFile(join(__dirname, '../renderer/index.html'))
	} else {
		// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
		const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`

		win.loadURL(url)
		win.webContents.openDevTools()
	}

	// Test active push message to Renderer-process
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send('main-process-message', new Date().toLocaleString())
	})

	// Make all links open with the browser, not with the application
	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith('https:')) shell.openExternal(url)
		return { action: 'deny' }
	})
	return win
}

function setWindowThreadPoolParameters() {
	const schemaOptions = [
		{
			page: 'index',
			limit: 1,
			config: ConfigTypes.WindowConfig,
		},
		{
			page: 'setting',
			limit: 1,
			config: ConfigTypes.WindowConfig,
		},
	]
	WindowsManager.prepare(schemaOptions)
}
