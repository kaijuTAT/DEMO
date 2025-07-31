import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

/**
 * Main application entry point.
 * Initializes the Vue application and integrates Pinia for state management.
 */

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
