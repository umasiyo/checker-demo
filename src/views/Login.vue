<template>
  <div>
    <button @click="googleLogin" class="google-login-btn">Googleでログイン</button>
  </div>
</template>

<script>
export default {
  methods: {
    googleLogin () {
      const clientId = '57451321234-2101cp5j5qarg6bhmm8ucck277bej7ld.apps.googleusercontent.com' // Google Developer Consoleで設定したクライアントID
      const redirectUri = 'http://localhost:8080/callback'
      const scope = 'email profile'
      const responseType = 'token'

      // Google OAuth 2.0 認証URLを作成
      const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
                      `client_id=${clientId}&` +
                      `redirect_uri=${redirectUri}&` +
                      `scope=${scope}&` +
                      `response_type=${responseType}&` +
                      'include_granted_scopes=true'

      // 認証URLにリダイレクト
      window.location.href = authUrl
    }
  }
}
</script>

<style scoped>
/* Googleログインボタンのスタイル */
.google-login-btn {
  background-color: #4285f4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 200px;
}

.google-login-btn:hover {
  background-color: #357ae8;
}
</style>
