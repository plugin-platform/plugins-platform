import { setExecutionPolicy } from './Utils'
import { PowerShell } from 'node-powershell'
import { app } from 'electron'

export async function hasGit() {
	await setExecutionPolicy()
	return PowerShell.invoke('git --version', {
		spawnOptions: {
			cwd: app.getAppPath(),
		},
	})
		.then(d => {
			console.log(d.raw)
			return d.raw.replace('git version ', '')
		})
		.catch(e => {
			return null
		})
}

global.config.library.git = hasGit()
