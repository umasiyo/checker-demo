// store.js
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    isAuthenticated: false,
    userEmail: null,
    userName: null,
    userIcon: null
  },
  mutations: {
    setAuth (state, { isAuthenticated, userEmail, userName, userIcon }) {
      state.isAuthenticated = isAuthenticated
      state.userEmail = userEmail
      state.userName = userName
      state.userIcon = userIcon

      // 状態をlocalStorageに保存
      localStorage.setItem('authState', JSON.stringify(state))
    },
    restoreAuth (state, savedState) {
      Object.assign(state, savedState)
    },
    clearAuth (state) {
      state.isAuthenticated = false
      state.userEmail = null
      state.userName = null
      state.userIcon = null

      // localStorageをクリア
      localStorage.removeItem('authState')
    }
  },
  actions: {
    login ({ commit }, user) {
      commit('setAuth', {
        isAuthenticated: true,
        userEmail: user.email,
        userName: user.name,
        userIcon: user.picture
      })
    },
    logout ({ commit }) {
      commit('clearAuth')
    }
  }
})

// アプリ起動時にlocalStorageから状態を復元
const savedState = localStorage.getItem('authState')
if (savedState) {
  store.commit('restoreAuth', JSON.parse(savedState))
}

export default store
