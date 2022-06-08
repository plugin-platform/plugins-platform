<template>
	<n-config-provider
		:theme="darkTheme"
		:theme-overrides="themeOverrides"
		:locale="zhCN"
		:date-locale="dateZhCN"
	>
		<router-view></router-view>
	</n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'

const themeOverrides = {
	common: {
		primaryColor: 'rgba(255,255,255,.8)',
		primaryColorHover: 'rgba(255,255,255,.8)',
		primaryColorPressed: 'rgba(255,255,255,.8)',
		primaryColorSuppl: 'rgba(255,255,255,.8)',
	},
	Switch: {
		railColorActive: '#0275d8',
	},
}
</script>
