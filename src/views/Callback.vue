<template>
  <div>
    <p v-if="error">認証エラー: {{ error }}</p>
    <p v-else>ログイン成功: {{ userInfo }}</p>
  </div>
</template>

<script>
import { nextTick } from 'vue'

export default {
  name: 'Callback',
  data () {
    return {
      error: null,
      userInfo: null
    }
  },
  mounted () {
    // URLに含まれるアクセストークンを取得
    const urlParams = new URLSearchParams(window.location.hash.substr(1))
    const accessToken = urlParams.get('access_token')
    const error = urlParams.get('error')

    if (error) {
      this.error = error
    } else if (accessToken) {
      // トークンが取得できたら、Google APIを使ってユーザー情報を取得
      fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log('取得したユーザー情報:', data)
          this.userInfo = data
          // ここでユーザーのメールアドレスがサークルのドメインかを確認し、リダイレクトを行います
          if (this.userInfo.email.endsWith('@wasedasai.net')) {
            console.log('サークルのアカウントです')
            this.$store.dispatch('login', { email: data.email, name: data.name, picture: data.picture }) // Vuex に保存
            nextTick(() => {
              this.$router.push({ name: 'Home' }).catch(err => {
                console.error('ルーティングエラー:', err)
              })
            }
            )
            // ログイン成功後の処理
          } else {
            console.error('無効なドメインです！適切な組織アカウントでログインしてください。')
            this.$router.push('/login')
          }
        })
        .catch(err => {
          console.error('ユーザー情報の取得に失敗しました:', err)
        })
    }
  }
}
</script>
