import { BrowserWindow } from 'electron'

export function getBrowserWindowByWebContentID(webContentID: number) {
	return BrowserWindow.getAllWindows().find(which => which.webContents.id === webContentID)
}

export function getWebContentSize(win: BrowserWindow) {
	if (!win) {
		return {
			width: 800,
			height: 600,
		}
	}
	return win.webContents.executeJavaScript(`document.querySelector('html').getBoundingClientRect().toJSON()`, true)
}
