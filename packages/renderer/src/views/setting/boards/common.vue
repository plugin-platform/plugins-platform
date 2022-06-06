<template>
	<div class="setting-board"></div>
</template>

<script setup>
const defaultConfig = {
	common: {
		startup: false,
	},
}
const config = window.localStorage.getItem('config') || defaultConfig
console.log(config)
</script>

<style scoped lang="scss">
.setting-board {
	width: 100%;
	height: 100%;
}
</style>
