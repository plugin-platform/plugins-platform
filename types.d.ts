declare module TinyEmitter {}
declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production'
		readonly VITE_DEV_SERVER_HOST: string
		readonly VITE_DEV_SERVER_PORT: string
	}
}

declare interface TransferType<T> {
	type: string
	data: T
}

declare interface PluginInformation {
	name: string
	logo: string
	description: string
	homepage: string
	author: string
	location: string
	source: string
	type: string
	hotKey: PluginHotkey[]
}

declare interface GlobalState {
	cacheDir: string
	library: {
		git: Promise<string | null>
		node: Promise<string | null>
		pnpm: Promise<string | null>
		yarn: Promise<string | null>
	}
	plugins: PluginInformation[]
}

declare const global = {
	$state: GlobalState,
	$bus: TinyEmitter,
}

declare interface PluginPackageJSON {
	name: string
	pluginName: string
	description: string
	author: string
	main: string
	preload: string
	logo: string
	version: string
	dependence: string
	homepage: string
	pluginType: string
	source: string
	hotKey: PluginHotkey[]
}

declare interface PluginHotkey {
	code: string
	explain: string
	cmd: any[]
}
