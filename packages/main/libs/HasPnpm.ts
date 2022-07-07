import { PowerShell } from 'node-powershell'
import { app } from 'electron'
import { hasNode } from '.'

export async function hasPnpm() {
	const node = await hasNode()
	if (!node) {
		return false
	}
	return PowerShell.invoke('pnpm -v', {
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
global.$state.library.node = hasPnpm()
