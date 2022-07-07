<template>
	<div class="plugins">
		<div class="plugin-item" v-for="plugin in plugins">
			<img :src="plugin.logo" alt="" />
			<div>{{ plugin.name }}</div>
			<div>{{ plugin.description }}</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const plugins = ref([])

window.pp.getAppList().then(data => (plugins.value = data))
</script>

<style scoped lang="scss">
.plugins {
	height: 100%;
	padding: 30px 15px;
	padding-left: 0;
	.n-card {
		width: 100%;
	}
}
</style>
