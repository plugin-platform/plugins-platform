<template>
	<n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
		<router-view></router-view>
	</n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'
</script>
