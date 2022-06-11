import {
	BrowserWindow,
	ipcMain,
	dialog,
	app,
	Notification,
	nativeImage,
	clipboard,
	shell,
} from 'electron'
import fs from 'fs'
import path from 'path'
import { DB } from '../db'
import plist from 'plist'
import { getConfig } from './getConfig'

const dbpath = path.resolve(app.getPath('userData'), './pouchdb')
const dbInstance = new DB(dbpath)
dbInstance.init()

const API: any = {
	currentPlugin: null,
	DBKEY: 'RUBICK_DB_DEFAULT',
	installPlugin() {},
	mountPlugin() {},
	unMountPlugin() {},
	uninstallPlugin() {},

	startup({ data }) {
		app.setLoginItemSettings({
			openAtLogin: data,
		})
	},
	setWindowSize({ data }, win) {
		win.setSize(data.width, data.height)
	},

	showNotification({ data: { body } }) {
		if (!Notification.isSupported()) return
		typeof body !== 'string' && (body = String(body))
		const plugin = API.currentPlugin
		if (!plugin) return
		const notify = new Notification({
			title: plugin.pluginName,
			body,
			icon: plugin.logo,
		})
		notify.show()
	},
	copyImage: ({ data }) => {
		const image = nativeImage.createFromDataURL(data.img)
		clipboard.writeImage(image)
	},
	copyText({ data }) {
		clipboard.writeText(String(data.text))
		return true
	},
	copyFile: ({ data }) => {
		if (data.file && fs.existsSync(data.file)) {
			clipboard.writeBuffer('NSFilenamesPboardType', Buffer.from(plist.build([data.file])))
			return true
		}
		return false
	},
	dbPut({ data }) {
		return dbInstance.put(API.DBKEY, data.data)
	},
	dbGet({ data }) {
		return dbInstance.get(API.DBKEY, data.id)
	},
	dbGetSync({ data }) {
		return dbInstance.get(API.DBKEY, data.id)
	},
	dbRemove({ data }) {
		return dbInstance.remove(API.DBKEY, data.doc)
	},
	dbBulkDocs({ data }) {
		return dbInstance.bulkDocs(API.DBKEY, data.docs)
	},
	dbAllDocs({ data }) {
		return dbInstance.allDocs(API.DBKEY, data.key)
	},

	getPath({ data }) {
		return app.getPath(data)
	},
	getConfig,
}

export function useMainApi() {
	ipcMain.handle('msg-trigger', async (event, arg) => {
		const window = BrowserWindow.fromWebContents(event.sender)
		const data = await API[arg.type](arg, window, event)
		return data
	})
	ipcMain.on('msg-trigger', async (event, arg) => {
		const window = BrowserWindow.fromWebContents(event.sender)
		const data = await API[arg.type](arg, window, event)
		event.returnValue = data
	})
}
