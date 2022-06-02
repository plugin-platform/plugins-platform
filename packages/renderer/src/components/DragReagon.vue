<template>
	<div class="drag-reagon" ref="drag">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'

const drag = ref()
const info = reactive({
	leftDown: false,
	x: 0,
	y: 0,
})
function onMouseDown(e: MouseEvent) {
	if (e.button !== 0) {
		return false
	}
	info.leftDown = true
	info.x = e.pageX
	info.y = e.pageY
}
function onMouseMove(e: MouseEvent) {
	if (!info.leftDown) {
		return false
	}
	window.$send('move-window', {
		x: e.screenX - info.x,
		y: e.screenY - info.y,
	})
}

function onMouseUp(e: Event) {
	info.leftDown = false
}

function bindEvent() {
	const dom = drag.value as HTMLDivElement
	dom.addEventListener('mousedown', onMouseDown)
	window.addEventListener('mousemove', onMouseMove)
	dom.addEventListener('mouseup', onMouseUp)
}

function unBindEvent() {
	const dom = drag.value as HTMLDivElement
	dom.removeEventListener('mousedown', onMouseDown)
	window.removeEventListener('mousemove', onMouseMove)
	dom.removeEventListener('mouseup', onMouseUp)
}

onMounted(bindEvent)
onBeforeUnmount(unBindEvent)
</script>

<style></style>
