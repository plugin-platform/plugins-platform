import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { getEnv } from './libs'

export function createMainWindow(): BrowserWindow {
	const win = new BrowserWindow({
		show: true,
		frame: false,
		resizable: false,
		transparent: true,
		// skipTaskbar: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: join(__dirname, '../preload/index.cjs'),
		},
	})

	if (app.isPackaged) {
		win.loadFile(join(__dirname, '../renderer/index.html'))
	} else {
		// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
		const host = getEnv('VITE_DEV_SERVER_HOST')
		const port = getEnv('VITE_DEV_SERVER_PORT')
		const url = `http://${host}:${port}/#/index`
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
