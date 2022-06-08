import { createApp } from 'vue'
import router from './routes'
import App from './App.vue'
import i18n from './locales'
import 'normalize.css'

createApp(App).use(router).use(i18n).mount('#app').$nextTick(window.removeLoading)
