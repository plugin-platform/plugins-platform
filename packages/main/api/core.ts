import { GlobalConfig, InstallParams } from '../../global'
import { app } from 'electron'
import { resolve } from 'path'
import { existsSync, mkdirSync } from 'fs'

const pkg = (process.env as any).pkg

const config: GlobalConfig = {
	cacheDir: resolve(app.getPath('temp'), './' + pkg.name),
}

export function installPlugin(options: InstallParams) {
	existsSync(config.cacheDir) || mkdirSync(config.cacheDir)
}
