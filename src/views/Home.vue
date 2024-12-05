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
        <span class="text-gray-800 font-medium pr-0">{{ userName }}</span>
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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <img :src="work.thumbnail" alt="Thumbnail" class="h-full w-full object-cover" />
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
      selectedSort: '' // ソート条件も最初は空
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
    }
  }
}
</script>
