import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';

/**
 * 主应用程序入口点。
 * 初始化 Vue 应用程序并集成 Pinia 进行状态管理。
 */

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');