<template>
	<div class="menu">
		<div
			class="menu-child flex fyc"
			:class="{ selected: menuName === item.name }"
			v-for="(item, index) in menuData"
			@click="$emit('change', index)"
		>
			<n-icon size="16">
				<component :is="icons[item.icon]"></component>
			</n-icon>
			<div>{{ item.title }}</div>
		</div>
	</div>
</template>

<script setup>
import { inject } from 'vue'

const icons = inject('icons')
const menuData = inject('menuData')
const menuName = inject('menuName')
const $emit = defineEmits(['change'])
</script>

<style scoped lang="scss">
.menu {
	height: 100%;
	width: 200px;
	padding: 20px 10px;
	padding-right: 0;
	.menu-child {
		height: 40px;
		padding: 0 10px;
		font-size: 16px;
		column-gap: 10px;
		color: $text-description;
		border-radius: 4px;
		transition: color 0.36s;
		&.selected {
			color: $text-normal;
			background: $bg-hover;
		}
		&:hover {
			color: $text-normal;
		}
	}
}
</style>
