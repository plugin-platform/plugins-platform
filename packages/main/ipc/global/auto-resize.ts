import { BrowserWindow, IpcMainEvent } from 'electron'
import { getWebContentSize } from '../../libs/Utils'

async function handler(e: IpcMainEvent, d: any) {
	const win = BrowserWindow.fromWebContents(e.sender)
	if (!win) {
		return false
	}
	const { width, height } = await getWebContentSize(win)
	win.setSize(width, height)
}

export default {
	name: 'auto-resize',
	handler,
}
