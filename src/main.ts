import { createApp } from 'vue'
// HTML对默认样式进行标准化
import './styles/normalize.css'
import App from './App.vue'

console.log(import.meta.env.VITE_BASE_URL)

createApp(App).mount('#app')
