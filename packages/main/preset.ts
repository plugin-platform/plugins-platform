import { resolve } from 'path'
import { app } from 'electron'

const pkg = (process.env as any).pkg
global.config = {
	cacheDir: resolve(app.getPath('temp'), './' + pkg.name),
	library: {
		git: null,
		node: null,
		pnpm: null,
		yarn: null,
	},
}
