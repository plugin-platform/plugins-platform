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
		primaryColor: '#202a35',
	},
}
</script>
