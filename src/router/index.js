import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Home.vue'
import LoginPage from '@/views/Login.vue'
import UploadPage from '@/views/Upload.vue'
import WorkDetail from '@/views/WorkDetail.vue'
import { store } from '@/store/store'

// ルートの定義
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/callback',
    name: 'callback',
    component: () => import('@/views/Callback.vue') // 認証後にリダイレクトされる画面
  },
  {
    path: '/upload',
    name: 'Upload',
    component: UploadPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/work/:id',
    name: 'Work',
    component: WorkDetail,
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated
  const userEmail = store.state.userEmail

  if (to.meta.requiresAuth) {
    if (isAuthenticated && userEmail.endsWith('@wasedasai.net')) {
      next() // 認証成功時はそのまま遷移
    } else {
      next({ name: 'Login' }) // 未認証の場合はログインページへ
    }
  } else {
    next() // 認証が不要なルートはそのまま遷移
  }
})

export default router
