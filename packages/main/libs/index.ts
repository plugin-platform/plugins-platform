export * from './HasNode'
export * from './HasYarn'
export * from './HasPnpm'
export * from './Utils'

export function getEnv(key) {
	const env = process.env
	return env[key]
}
