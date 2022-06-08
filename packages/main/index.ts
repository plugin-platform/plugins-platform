import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { app, BrowserWindow } from 'electron'
import { release } from 'os'
import { createMainWindow } from './window'
import { useIPC } from './ipc'
import { useMainApi } from './api'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
	app.quit()
}

let win: BrowserWindow | null = null

app.whenReady()
	.then(() => {
		if (!app.isPackaged) {
			installExtension(VUEJS3_DEVTOOLS.id).catch(e => e)
		}
	})
	.then(() => {
		useIPC()
		useMainApi()
		win = createMainWindow()
	})

app.on('window-all-closed', () => {
	win = null
	if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
	if (win) {
		// Focus on the main window if the user tried to open another
		if (win.isMinimized()) win.restore()
		win.focus()
	}
})

app.on('activate', () => {
	const allWindows = BrowserWindow.getAllWindows()
	if (allWindows.length) {
		allWindows[0].focus()
	} else {
		createMainWindow()
	}
})
