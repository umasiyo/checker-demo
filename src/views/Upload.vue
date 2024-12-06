<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- フォームヘッダー
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-left">新しい制作物の追加</h1>
      <p class="text-lg text-gray-700">以下のフォームに入力してください。</p>
    </header> -->
    <!-- ヘッダー -->
    <header class="flex justify-between items-center mb-6">
      <div class="flex-row">
      <h1 class="text-3xl font-bold text-left">制作物チェックシステム</h1>
      <h1 class="text-xl text-left">新しい制作物の追加</h1></div>
      <div v-if="isAuthenticated" class="flex items-center space-x-3">
        <img
          :src="userIcon"
          alt="User Icon"
          class="w-10 h-10 rounded-full border border-gray-300"
        />
        <span class="text-gray-800 font-medium pr-0">{{ userName }}</span>
        <button
          @click="logout"
          class="border border-red-500 text-red-500 py-1.5 px-4 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          ログアウト
        </button>
      </div>
    </header>
    <div class="flex flex-row-reverse">
      <button
              @click="goToHome"
              class="text-right h-10 border bg-gray-700 text-white py-1.5 px-4 rounded-lg hover:bg-gray-800 transition"
            >
              ホームに戻る
            </button>
    </div>
    <!-- フォーム -->
    <form @submit.prevent="handleSubmit" class="mx-auto space-y-6 w-1/2">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">タイトル</label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">説明</label>
        <textarea
          id="description"
          v-model="formData.description"
          rows="4"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="content_url" class="block text-sm font-medium text-gray-700">コンテンツURL</label>
        <input
          id="content_url"
          v-model="formData.content_url"
          type="url"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="thumbnail" class="block text-sm font-medium text-gray-700">サムネイルURL</label>
        <input
          id="thumbnail"
          v-model="formData.thumbnail"
          type="url"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="deadline" class="block text-sm font-medium text-gray-700">締め切り</label>
        <input
          id="deadline"
          v-model="formData.deadline"
          type="datetime-local"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="category" class="block text-sm font-medium text-gray-700">カテゴリ</label>
        <select
          id="category"
          v-model="formData.category"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="デザイン">デザイン</option>
          <option value="映像">映像</option>
          <!-- 必要に応じてカテゴリを追加 -->
        </select>
      </div>

      <!-- <div class="mb-4">
        <label for="status" class="block text-sm font-medium text-gray-700">ステータス</label>
        <select
          id="status"
          v-model="formData.status"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="チェック未提出">チェック未提出</option>
          <option value="チェック待ち">チェック待ち</option>
          <option value="チェック中">チェック中</option>
          <option value="チェック済み">チェック済み</option>
          <option value="差し戻し中">差し戻し中</option>
        </select>
      </div> -->

      <!-- <div class="mb-4">
        <label for="submitter" class="block text-sm font-medium text-gray-700">提出者名</label>
        <input
          id="submitter"
          v-model="formData.submitter"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div> -->

      <div class="mb-4">
        <label for="text_url" class="block text-sm font-medium text-gray-700">テキストURL</label>
        <input
          id="text_url"
          v-model="formData.text_url"
          type="url"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="docs_url" class="block text-sm font-medium text-gray-700">ドキュメントURL</label>
        <input
          id="docs_url"
          v-model="formData.docs_url"
          type="url"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- 送信ボタン -->
      <div class="mb-4">
        <button
          type="submit"
          class="w-40 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          制作物を追加
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'UploadPage',
  data () {
    return {
      formData: {
        title: '',
        description: '',
        content_url: '',
        thumbnail: '',
        deadline: '',
        category: 'デザイン',
        status: 'チェック未提出',
        submitter: '',
        text_url: '',
        docs_url: ''
      }
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'userName', 'userIcon'])
  },
  methods: {
    ...mapActions(['logout']),
    async handleSubmit () {
      try {
        // サーバーにデータをPOST
        // this.formData.submitter = userName
        this.formData.status = 'チェック待ち' // ステータスに「チェック待ち」を代入
        this.formData.submitter = this.userName // 提出者名にログイン中のユーザー名を代入

        const response = await axios.post('http://localhost:3000/api/addData', this.formData)
        alert(response.data.message)
        this.resetForm()
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.error('データの送信に失敗しました:', error)
      }
    },
    resetForm () {
      this.formData = {
        title: '',
        description: '',
        content_url: '',
        thumbnail: '',
        deadline: '',
        category: 'デザイン',
        status: 'チェック未提出',
        submitter: '',
        text_url: '',
        docs_url: ''
      }
    },
    goToHome () {
      this.$router.push({ name: 'Home' }) // 名前でルート指定
    }
  }
}
</script>
