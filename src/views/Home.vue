<!-- <template>
  <div class="home">
    <h1>作品一覧</h1>
    <ul>
      <li v-for="(work, index) in works" :key="index">
        <router-link :to="`/work/${work.id}`">{{ work.title }}</router-link>
      </li>
    </ul>
  </div>
</template> -->

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">制作物一覧</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(work, index) in works" :key="index"
        class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
      >
        <!-- サムネイル -->
        <div class="h-48 bg-gray-300 flex items-center justify-center">
        <!-- <div class="relative pb-9/16"> -->
          <img :src="work.thumbnail" alt="Thumbnail" class="h-full w-full object-cover" />
        </div>
        <!-- コンテンツ部分 -->
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
import data from '@/assets/data.json'

export default {
  name: 'HomePage',
  data () {
    return {
      works: data
      // works: [
      //   { id: 1, title: 'デザイン作品A' },
      //   { id: 2, title: '動画作品B' },
      //   { id: 3, title: 'デザイン作品C' }
      // ] // 最後の要素にカンマをつけない
    }
  },
  methods: {
    checkItem (id) {
      alert(`アイテムID: ${id} をチェックしました！`)
    }
  }
}
</script>

<style>

</style>
