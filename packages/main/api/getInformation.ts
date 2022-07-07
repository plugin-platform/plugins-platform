import { app } from 'electron'

export async function getConfig() {
	const loginInfo = app.getLoginItemSettings()
	return {
		common: {
			startup: loginInfo.openAtLogin,
			hasNode: null,
			hasYarn: null,
			hasPnpm: null,
		},
	}
}

export function getAppList() {
	return global.$state.plugins
}
