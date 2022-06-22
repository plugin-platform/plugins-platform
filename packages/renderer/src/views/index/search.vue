<template>
	<div class="input-holder">
		<input class="search" ref="inputDom" type="text" @input="onInput" v-model="val" />
	</div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'

const val = ref('')
const inputDom = ref()
const state = reactive({
	mode: null,
})

onMounted(() => {
	const dom = inputDom.value
	dom.focus()
})
const onInput = () => {
	let text = val.value
	if (text.slice(-4) === '.git') {
		state.mode = 'git'
	} else {
		const reg = window.pp.isLinux() ? /^\/([\u4E00-\u9FA5A-Za-z0-9_]+\/{1})+$/ : /^[a-zA-Z]:/
		if (reg.test(text)) {
			state.mode = 'local'
		}
	}
}
</script>

<style lang="scss" scoped>
.search {
	display: block;
	height: 100%;
	width: 100%;
	border: none;
	outline: none;
	padding: 0;
	background-color: transparent;
	color: transparentize(white, 0.2);
	text-indent: 20px;
}
.input-holder {
	position: relative;
}
</style>
