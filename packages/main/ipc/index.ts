import { IpcMain, ipcMain } from 'electron'

export function useIPC() {
	const modules = import.meta.globEager('./**/*.ts')
	Object.keys(modules).forEach(key => {
		const m = modules[key].default ? modules[key].default : modules[key]
		m.type = m.type ? m.type : 'on'
		ipcMain[m.type as keyof IpcMain](m.name as never, m.handler)
	})
	// console.log(modules)
}
