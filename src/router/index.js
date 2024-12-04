import { createRouter, createWebHistory } from 'vue-router'

// ルートの定義
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/Home.vue') // 適宜修正
  },
  {
    path: '/upload',
    name: 'UploadPage',
    component: () => import('../views/Upload.vue') // 適宜修正
  }
]

// ルーターの作成
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
