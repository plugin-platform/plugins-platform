<template>
	<input class="search" ref="input" type="text" v-model="val" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const val = ref('')
const input = ref()

onMounted(() => {
	const dom = input.value as HTMLInputElement
	dom.focus()
})
</script>

<style lang="scss">
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
</style>
