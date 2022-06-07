import { IpcMainEvent, BrowserWindow } from 'electron'

async function handler(e: IpcMainEvent, d: any) {
	const win = BrowserWindow.fromWebContents(e.sender)
	if (!win) {
		return false
	}
	win.setPosition(d.x, d.y)
}

export default {
	name: 'move-window',
	handler,
}
