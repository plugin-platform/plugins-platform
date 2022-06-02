<template>
	<DragReagon>
		<div class="container">
			<Search></Search>
			<n-icon class="setting" size="32" color="white">
				<SettingsRound></SettingsRound>
			</n-icon>
		</div>
	</DragReagon>
</template>

<script setup lang="ts">
import { SettingsRound } from '@vicons/material'
import DragReagon from '@/components/DragReagon.vue'
import Search from './search.vue'
</script>

<style scoped lang="scss">
.container {
	font-family: Alibaba, Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 60px;
	background-color: #2c3e50;
	display: grid;
	grid-template-columns: 1fr 50px;
	border-radius: 8px;
	align-items: center;
	.setting {
		cursor: pointer;
		&:hover {
			animation: rotate 0.4s;
			@keyframes rotate {
				0% {
					transform: rotate(0);
				}
				33% {
					transform: rotate(60deg);
				}
				66% {
					transform: rotate(0);
				}
				100% {
					transform: rotate(60deg);
				}
			}
		}
	}
}
</style>
