export enum InstallMode {
	git = 'git',
	local = 'local',
}

export type InstallParams = {
	mode: InstallMode
}

export interface GlobalConfig {
	cacheDir: string
}
