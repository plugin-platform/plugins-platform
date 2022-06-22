<template>
	<div class="setting-board">
		<div class="line-item flex fyc xgap-10">
			<n-card title="node" size="small" @click="updateHasNode" :hoverable="true">
				{{ common.hasNode || $t(notInstall) }}
			</n-card>
			<n-card title="yarn" size="small" @click="updateHasYarn" :hoverable="true">
				{{ common.hasYarn || $t(notInstall) }}
			</n-card>
			<n-card title="pnpm" size="small" @click="updateHasPnpm" :hoverable="true">
				{{ common.hasPnpm || $t(notInstall) }}
			</n-card>
			<n-card title="git" size="small" @click="updateHasGit" :hoverable="true">
				{{ common.hasGit || $t(notInstall) }}
			</n-card>
		</div>
		<div class="line-item flex fxsb fyc">
			<div class="name">{{ $t('dashboard.startup') }}</div>
			<n-switch :value="common.startup" @update:value="updateVal" />
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
import { inject, ref, computed } from 'vue'
import i18n, { languages, getLocale } from '@/locales'

const config = inject('config')
const notInstall = 'dashboard.notInstall'
const common = computed(() => config.value.common)

const updateVal = val => {
	config.value.common.startup = val
	window.pp.startup(config.value.common.startup)
}

const updateHasNode = () => {
	common.value.hasNode = null
	window.pp.hasNode().then(r => (common.value.hasNode = r))
}
const updateHasYarn = () => {
	common.value.hasYarn = null
	window.pp.hasYarn().then(r => (common.value.hasYarn = r))
}
const updateHasPnpm = () => {
	common.value.hasPnpm = null
	window.pp.hasPnpm().then(r => (common.value.hasPnpm = r))
}
const updateHasGit = () => {
	common.value.hasPnpm = null
	window.pp.hasGit().then(r => (common.value.hasGit = r))
}
;(() => {
	updateHasNode()
	updateHasYarn()
	updateHasPnpm()
	updateHasGit()
})()

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
		margin: 20px auto;
		&:first-child {
			margin-top: 0;
		}
	}
	.select {
		display: grid;
		grid-template-columns: 1fr 100px;
	}
}
</style>
