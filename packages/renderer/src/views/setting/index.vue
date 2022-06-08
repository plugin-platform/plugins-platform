<template>
	<DragReagon>
		<div class="container">
			<PMenu @change="changeMenu"></PMenu>
			<component :is="boards[menuName]" v-if="config"></component>
		</div>
	</DragReagon>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ComputerTwotone, BookmarksTwotone } from '@vicons/material'
import DragReagon from '@/components/DragReagon.vue'
import PMenu from './left-menu.vue'
import { ref, provide, computed } from 'vue'

// 批量引入设置页面的组件,不同项的配置通过name来渲染对应的component
const boardFiles = import.meta.globEager('./boards/*.vue')
const boards = {}
Object.keys(boardFiles).forEach(key => {
	const name = key.replace('./boards/', '').replace('.vue', '')
	boards[name] = boardFiles[key].default
})

const icons = {
	ComputerTwotone,
	BookmarksTwotone,
}

const menuData = [
	{
		title: 'menu.common',
		name: 'common',
		icon: 'ComputerTwotone',
	},
	{
		title: 'menu.plugin',
		name: 'plugins',
		icon: 'BookmarksTwotone',
	},
]
const selectedKey = ref(0)
const menuName = computed(() => menuData[selectedKey.value].name)

provide('icons', icons)
provide('menuData', menuData)
provide('menuName', menuName)
const changeMenu = index => (selectedKey.value = index)

// 应用的设置
const config = ref(null)
window.pp.getConfig().then(d => {
	config.value = d
})
provide('config', config)
</script>

<style lang="scss" scoped>
.container {
	font-family: Alibaba, Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	min-height: 600px;
	background-color: $bg;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-column-gap: 10px;
	border: 1px solid transparentize(white, 0.9);
	border-radius: 8px;
	align-items: center;
	box-shadow: 0 0 10px transparentize(black, 0.5);
}
</style>
