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

declare interface GlobalConfig {
	cacheDir: string
	library: {
		git: Promise<string | null>
		node: Promise<string | null>
		pnpm: Promise<string | null>
		yarn: Promise<string | null>
	}
}

declare const global = {
	config: GlobalConfig,
}
