import { ipcRenderer } from 'electron'

export function useAutoResize() {
	const option = {
		childList: true,
		subtree: true,
		attributeFilter: ['class'],
		attributeOldValue: true,
		characterDataOldValue: true,
	}

	const observer = new MutationObserver(onResize)

	observer.observe(document.body, option)
}

function onResize() {
	ipcRenderer.send('auto-resize')
}
