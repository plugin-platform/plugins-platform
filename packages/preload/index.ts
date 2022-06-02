import { domReady } from './utils'
import { useLoading } from './loading'
import { useAutoResize } from './auto-resize'
import { ipcRenderer } from 'electron'

const { appendLoading, removeLoading } = useLoading()
window.removeLoading = removeLoading

window.$send = ipcRenderer.send.bind(ipcRenderer)
window.$sendSync = ipcRenderer.sendSync.bind(ipcRenderer)
window.$invoke = ipcRenderer.invoke.bind(ipcRenderer)

domReady().then(useAutoResize).then(appendLoading)
