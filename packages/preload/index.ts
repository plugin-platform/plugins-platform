import { domReady, useLoading, useRendererApi } from './functional'
import { lstat } from 'fs/promises'
import { cwd } from 'process'
import { ipcRenderer, contextBridge } from 'electron'

const { appendLoading, removeLoading } = useLoading()

// Usage of ipcRenderer.on
ipcRenderer.on('main-process-message', (_event, ...args) => {
	console.log('[Receive Main-process message]:', ...args)
})
console.log(cwd())
lstat(cwd())
	.then(stats => {
		console.log('[fs.lstat]', stats)
	})
	.catch(err => {
		console.error(err)
	})

contextBridge.exposeInMainWorld('removeLoading', removeLoading)

domReady().then(useRendererApi).then(appendLoading)
