<template>
	<div class="setting-board">
		<div class="line-item flex fxsb fyc">
			<div class="name">开机启动</div>
			<n-switch v-model="config.common.startup" />
		</div>
	</div>
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
	padding: 50px 20px;
	padding-right: 100px;
	padding-bottom: 0;
	color: $text-description;
	font-size: 16px;
	.line-item {
		width: 100%;
	}
}
</style>
