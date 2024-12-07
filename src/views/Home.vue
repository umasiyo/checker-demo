<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- ヘッダー -->
    <header class="flex justify-between items-center mb-6">
      <div class="flex-row">
      <h1 class="text-3xl font-bold text-left">制作物チェックシステム</h1>
      <h1 class="text-xl text-left">おつかれさま、{{ userName }}！</h1></div>
      <div v-if="isAuthenticated" class="flex items-center space-x-3">
        <img
          :src="userIcon"
          alt="User Icon"
          class="w-10 h-10 rounded-full border border-gray-300"
        />
        <div class="flex-row">
          <span class="text-left text-gray-800 font-medium pr-0">{{ userName }}</span>
          <p class="text-left text-xs text-gray-800 font-medium pr-0">広報制作局 映像チーム</p>
        </div>
        <button
          @click="logout"
          class="border border-red-500 text-red-500 py-1.5 px-4 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          ログアウト
        </button>
      </div>
    </header>
    <!-- 一覧操作メニュー -->
    <div class="flex justify-between">
        <!-- ソート用プルダウン -->
        <div class="flex">
          <div class="mb-6">
            <label for="category" class="flex-row text-sm font-medium text-gray-700 mb-2 pr-2">絞り込み</label>
            <select
              id="category"
              v-model="selectedCategory"
              class="mr-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">すべて</option>
              <option v-for="category in uniqueCategories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          <!-- 並び替え用プルダウン -->
          <div class="mb-6">
            <label for="sort" class="flex-row text-sm font-medium text-gray-700 mb-2 pr-2">並び替え</label>
            <select
              id="sort"
              v-model="selectedSort"
              class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">提出順</option>
              <option value="near">締め切り：近い順</option>
              <option value="far">締め切り：遠い順</option>
            </select>
          </div>
        </div>
        <!-- 右側のボタンたち -->
        <div>
          <button
            @click="switchView"
            class="mr-3 h-10 border bg-gray-700 text-white py-1.5 px-4 rounded-lg hover:bg-gray-800 transition"
          >
            ビューの切り替え
          </button>
          <button
            @click="goToUpload"
            class="h-10 border bg-red-500 text-white py-1.5 px-4 rounded-lg hover:bg-red-600 transition"
          >
            アップロード
          </button>
        </div>
    </div>
    <!-- 制作物一覧 -->
    <div v-if="isGridView" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(work, index) in filteredWorks" :key="index"
        class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
      >
      <!-- ステータスの表示 -->
      <div :class="getStatusClass(work.status)" class="h-10 w-full bg-red-500 flex items-center justify-between px-5">
        <p class="text-white text-center">{{ work.status }}</p>
        <p class="text-gray-600 text-center bg-white rounded-full px-3">{{ formatDeadline(work.deadline) }}</p>
      </div>
      <!-- サムネイル -->
      <div class="h-48 bg-gray-300 flex items-center justify-center">
          <!-- <img :src="work.thumbnail" alt="Thumbnail" class="h-full w-full object-cover" /> -->
          <img
            v-if="thumbnailUrl(work.content_url)"
            :src="thumbnailUrl(work.content_url)"
            alt="Google Drive Thumbnail"
            class="h-48 w-full object-cover"
          />
          <p v-else>サムネイルを取得できませんでした。</p>
        </div>
        <div class="p-4">
          <p :class="getCategoryClass(work.category)" class="inline-block px-2 py-0.5 mx-auto my-1 text-xs border bg-gray-300 text-white rounded-full">{{ work.category }}</p>
          <h2 class="text-xl font-semibold mb-2">{{ work.title }}</h2>
          <p class="text-gray-600 text-sm mb-4">{{ work.submitter }}</p>
          <button
            @click="checkItem(work.id)"
            class="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
          >
            チェック
          </button>
        </div>
      </div>
    </div>
    <div v-else class="space-y-2">
    <!-- リストビュー -->
    <div
      v-for="(work, index) in filteredWorks" :key="index"
      class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 flex items-center p-3"
    >
      <div class="h-10 w-10 bg-gray-300 flex-shrink-0 flex items-center justify-center mr-4">
        <img :src="work.thumbnail" alt="Thumbnail" class="h-full w-full object-cover" />
      </div>
      <!-- 左揃えの情報欄 -->
      <div class="flex space-x-4 whitespace-nowrap mr-4">
        <div :class="getStatusClass(work.status)" class="h-6 w-24 mb-1 text-white text-center rounded-lg px-2 py-0.5">
          {{ work.status }}
        </div>
        <h2 class="text-lg font-semibold truncate max-w-60">{{ work.title }}</h2>
        <p class="text-lg text-gray-600 truncate">{{ work.submitter }}</p>
        <p class="text-lg text-gray-500">{{ formatDeadline(work.deadline) }}</p>
        <p :class="getCategoryClass(work.category)" class="px-2 py-0.5 border bg-gray-300 text-white rounded-full">{{ work.category }}</p>
      </div>
      <!-- 右揃えの情報欄 -->
      <div class="ml-auto flex flex-row whitespace-nowrap">
        <button
        @click="openLink(work.docs_url)"
          class="border border-gray-700 text-gray-700 py-1 mr-2 px-3 rounded-lg hover:bg-gray-800 hover:text-white transition"
        >
          制作届
        </button>
        <button
          @click="openLink(work.text_url)"
          class="border border-gray-700 text-gray-700 py-1 mr-2 px-3 rounded-lg hover:bg-gray-800 hover:text-white transition"
        >
          文字情報
        </button>
        <button
          @click="checkItem(work.id)"
          class="bg-gray-700 text-white py-1 px-3 rounded-lg hover:bg-gray-800 transition"
        >
          チェック
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import data from '@/assets/data.json'

export default {
  name: 'HomePage',
  data () {
    return {
      works: data,
      selectedCategory: '', // フィルタリング最初は空
      selectedSort: '', // ソート条件も最初は空
      isGridView: false
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'userName', 'userIcon']),
    // ユニークなカテゴリリストを取得
    filteredWorks () {
      console.log('Selected Category:', this.selectedCategory)
      console.log('Selected Sort:', this.selectedSort)

      let works = this.getFilteredWorks()
      works = this.getSortedWorks(works)

      console.log('Filtered and Sorted Works:', works)
      return works
    },
    uniqueCategories () {
      return [...new Set(this.works.map(work => work.category))]
    }
  },
  methods: {
    ...mapActions(['logout']),
    checkItem (id) {
      alert(`アイテムID: ${id} をチェックしました！`)
    },
    getFilteredWorks () {
      if (this.selectedCategory) {
        return this.works.filter(work => work.category === this.selectedCategory)
      }
      return this.works
    },
    getSortedWorks (works) {
      const sortedWorks = [...works] // 配列のコピーを作成
      if (this.selectedSort === 'far') {
        return sortedWorks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
      } else if (this.selectedSort === 'near') {
        return sortedWorks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      }
      return sortedWorks
    },
    // work.category に応じて動的にクラスを返すメソッド
    getCategoryClass (category) {
      switch (category) {
        case '映像':
          return 'bg-red-500' // 映像のカテゴリは青
        case 'デザイン':
          return 'bg-green-500' // デザインのカテゴリは緑
        default:
          return 'bg-gray-300' // デフォルトはグレー
      }
    },
    getStatusClass (category) {
      switch (category) {
        case 'チェック未提出':
          return 'bg-gray-500'
        case 'チェック待ち':
          return 'bg-red-500'
        case 'チェック中':
          return 'bg-yellow-500'
        case 'チェック済み':
          return 'bg-green-500'
        case '差し戻し中':
          return 'bg-red-500'
        default:
          return 'bg-gray-300' // デフォルトはグレー
      }
    },
    formatDeadline (deadline) {
      const date = new Date(deadline)
      const month = date.getMonth() + 1 // 月は0から始まるので1を足す
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes().toString().padStart(2, '0') // 分を2桁にする

      return `${month}/${day} ${hours}:${minutes}`
    },
    goToUpload () {
      this.$router.push({ name: 'Upload' }) // 名前でルート指定
    },
    switchView () {
      this.isGridView = !this.isGridView
    },
    openLink (url) {
      if (url) {
        // window.location.href = url
        window.open(url, '_blank')
      } else {
        alert('リンクが設定されていません。')
      }
    },
    getGoogleDriveFileId (url) {
      const match = url.match(/\/d\/([^/]+)/)
      return match ? match[1] : null
    },
    getGoogleDriveThumbnailUrl (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}`
    },
    thumbnailUrl (url) {
      const fileId = this.getGoogleDriveFileId(url)
      if (fileId) {
        return this.getGoogleDriveThumbnailUrl(fileId)
      }
      return null
    }
  }
}
</script>
