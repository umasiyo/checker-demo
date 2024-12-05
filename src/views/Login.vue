<template>
  <div class="container mx-auto mt-10 py-20 px-6 bg-white shadow-md rounded-lg border border-gray-200">
    <h1 class="text-xl font-bold text-center">ログインをしてください</h1>
    <h2 class="text-md mb-8 text-center">特定の組織アカウントのみ<br>ログインできます</h2>
    <button @click="googleLogin" class="google-login-btn block mx-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
      Googleでログイン
    </button>
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

.container {
  max-width: 300px; /* 最大幅 */
}
</style>
