import { createStore } from 'vuex'

export const store = createStore({
  state: {
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    userEmail: localStorage.getItem('userEmail') || null
  },
  mutations: {
    setAuth (state, { isAuthenticated, userEmail }) {
      state.isAuthenticated = isAuthenticated
      state.userEmail = userEmail

      // localStorage に保存
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
      localStorage.setItem('userEmail', userEmail)
    }
  },
  actions: {
    login ({ commit }, user) {
      commit('setAuth', {
        isAuthenticated: true,
        userEmail: user.email
      })
    },
    logout ({ commit }) {
      commit('setAuth', {
        isAuthenticated: false,
        userEmail: null
      })

      // localStorage をクリア
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userEmail')
    }
  }
})
