<template>
  <div class="home">
    <h1>作品一覧</h1>
    <ul>
      <li v-for="(work, index) in works" :key="index">
        <router-link :to="`/work/${work.id}`">{{ work.title }}</router-link>
      </li>
    </ul>
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
  }
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}
</style>
