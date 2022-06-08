import { createI18n } from 'vue-i18n'

// User defined lang
import enLocale from './lang/en'
import zhLocale from './lang/zh-cn'

export const languages = {
	en: {
		...enLocale,
	},
	'zh-cn': {
		...zhLocale,
	},
}

export const getLocale = () => {
	const language = window.pp.db.getSync('language')
	return language?.value || 'zh-cn'
}

const i18n = createI18n({
	locale: getLocale(),
	messages: languages,
})

export default i18n
