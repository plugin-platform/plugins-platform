import { domReady } from './utils'
import { useLoading } from './loading'
import { useAutoResize } from './auto-resize'

const { appendLoading, removeLoading } = useLoading()
window.removeLoading = removeLoading

domReady().then(useAutoResize).then(appendLoading)
