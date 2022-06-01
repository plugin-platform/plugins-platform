import { BrowserWindow, IpcMainEvent } from 'electron'
import { getBrowserWindowByWebContentID, getWebContentSize } from '../../libs/Utils'

async function handler(e: IpcMainEvent, d: any) {
	const win = getBrowserWindowByWebContentID(e.sender.id)
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
