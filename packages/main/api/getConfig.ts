import { hasNode, hasYarn, hasPnpm } from '../libs'
import { app } from 'electron'

export async function getConfig() {
	const loginInfo = app.getLoginItemSettings()
	return {
		common: {
			startup: loginInfo.openAtLogin,
			hasNode: await hasNode(),
			hasYarn: await hasYarn(),
			hasPnpm: await hasPnpm(),
		},
	}
}
