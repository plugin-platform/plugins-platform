import { setExecutionPolicy } from './Utils'
import { PowerShell } from 'node-powershell'
import { app } from 'electron'

export async function hasNode() {
	await setExecutionPolicy()
	return PowerShell.invoke('node -v', {
		spawnOptions: {
			cwd: app.getAppPath(),
		},
	})
		.then(d => {
			return d.raw
		})
		.catch(e => {
			return null
		})
}
