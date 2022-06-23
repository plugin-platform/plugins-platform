<template>
	<div class="input-holder">
		<input
			class="search"
			ref="inputDom"
			type="text"
			@input="onInput"
			@keydown.enter="execute"
			v-model="val"
		/>
		<n-tag type="success" size="small" round v-if="tag"> {{ tag }} </n-tag>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'

const val = ref('')
const inputDom = ref()
const state = reactive({
	mode: null,
})

const tag = computed(() => {
	const tags = {
		git: '从git拉取',
		local: '本地链接',
	}
	return tags[state.mode]
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
window.pp.copyText('git@github.com:plugin-platform/pp-demo.git')
const execute = () => {
	switch (state.mode) {
		case 'git':
			return window.pp.installPlugin({
				mode: 'git',
				url: val.value,
			})
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
	.n-tag {
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
	}
}
</style>
