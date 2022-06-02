import { IpcMainEvent } from 'electron'
import { getBrowserWindowByWebContentID } from '../../libs/Utils'

async function handler(e: IpcMainEvent, d: any) {
	const win = getBrowserWindowByWebContentID(e.sender.id)
	if (!win) {
		return false
	}
	win.setPosition(d.x, d.y)
}

export default {
	name: 'move-window',
	handler,
}
