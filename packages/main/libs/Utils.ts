import { BrowserWindow } from 'electron'
import { PowerShell } from 'node-powershell'
import os from 'os'

export function getWebContentSize(win: BrowserWindow) {
	if (!win) {
		return {
			width: 800,
			height: 600,
		}
	}
	return win.webContents.executeJavaScript(
		`document.querySelector('html').getBoundingClientRect().toJSON()`,
		true
	)
}

export function setExecutionPolicy() {
	if (os.platform() === 'win32') {
		return PowerShell.$`set-ExecutionPolicy RemoteSigned -Scope CurrentUser`.catch(e => {
			console.log(e)
		})
	}
}
