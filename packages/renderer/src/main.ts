import { createApp } from 'vue'
import router from './routes'
import App from './App.vue'
import './samples/node-api'
import 'normalize.css'

createApp(App).use(router).mount('#app').$nextTick(window.removeLoading)
