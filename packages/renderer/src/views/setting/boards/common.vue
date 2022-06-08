<template>
	<div class="setting-board">
		<div class="line-item flex fxsb fyc">
			<div class="name">{{ $t('dashboard.startup') }}</div>
			<n-switch :value="config.common.startup" @update:value="updateVal" />
		</div>
		<div class="line-item select flex fxsb fyc">
			<div class="name">{{ $t('dashboard.language') }}</div>
			<n-select
				v-model:value="currentLanguage"
				@update:value="whenLanguageChange"
				:options="languageList"
			/>
		</div>
	</div>
</template>

<script setup>
import { inject, ref } from 'vue'
import i18n, { languages, getLocale } from '@/locales'

const config = inject('config')

const updateVal = val => {
	config.value.common.startup = val
	window.pp.startup(config.value.common.startup)
}

const keymap = {
	en: 'English',
	'zh-cn': '简体中文',
}
const languageList = ref(
	Object.keys(languages).map(key => {
		return {
			value: key,
			label: keymap[key],
		}
	})
)
const currentLanguage = ref(getLocale())
const whenLanguageChange = key => {
	i18n.global.locale = key
	window.pp.db.put({ _id: 'language', value: key })
}
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
		height: 50px;
	}
	.select {
		display: grid;
		grid-template-columns: 1fr 100px;
	}
}
</style>
