import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 修正した router をインポート
import './assets/styles/tailwind.css'
import { store } from './store/store' // storeのインポート

// アプリケーションを作成してルーターを追加
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
