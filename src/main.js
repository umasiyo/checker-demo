import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 修正した router をインポート

// アプリケーションを作成してルーターを追加
const app = createApp(App)
app.use(router)
app.mount('#app')
