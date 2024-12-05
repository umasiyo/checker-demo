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
    <!-- 制作物一覧 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(work, index) in works" :key="index"
        class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
      >
        <div class="h-48 bg-gray-300 flex items-center justify-center">
          <img :src="work.thumbnail" alt="Thumbnail" class="h-full w-full object-cover" />
        </div>
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ work.title }}</h2>
          <p class="text-gray-600 text-sm mb-4">{{ work.description }}</p>
          <button
            @click="checkItem(work.id)"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
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
      works: data
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'userName', 'userIcon'])
  },
  methods: {
    ...mapActions(['logout']),
    checkItem (id) {
      alert(`アイテムID: ${id} をチェックしました！`)
    }
  }
}
</script>
