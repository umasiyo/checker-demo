<template>
  <div class="flex flex-row h-screen bg-gray-100">
    <!-- 左側: 制作物の埋め込みエリア -->
    <div class="flex-1 bg-white flex items-center justify-center">
      <iframe
        v-if="work.content_url"
        :src="work.content_url"
        class="w-full h-full"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <p v-else class="text-gray-500">埋め込み用URLがありません。</p>
    </div>

    <!-- 右側: 詳細情報とチャットエリア -->
    <div class="w-96 bg-gray-50 border-l border-gray-200 p-4">
      <!-- 上部: 詳細情報 -->
      <div class="bg-white rounded-lg shadow-md p-4 mb-4">
        <div class="flex items-center justify-between mb-4">
          <span
            :class="getCategoryClass(work.category)"
            class="px-2 py-0.5 text-sm rounded-full text-white"
          >
            {{ work.category }}
          </span>
          <span class="text-gray-500">{{ formatDeadline(work.deadline) }}</span>
        </div>
        <h1 class="text-xl font-bold text-gray-800 mb-2">{{ work.title }}</h1>
        <p class="text-gray-600 mb-4">{{ work.submitter || '制作者不明' }}</p>
        <!-- <p class="text-gray-600 mb-4 text-xs">{{ work.description }}</p> -->
        <!-- descriptionは自動で作者からチャットに発信されるが良いかも -->
        <div class="flex justify-center space-x-2">
          <button
            v-if="work.text_url"
            @click="openLink(work.text_url)"
            class="w-1/2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            文字情報
          </button>
          <button
            v-if="work.docs_url"
            @click="openLink(work.docs_url)"
            class="w-1/2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            制作申請
          </button>
        </div>
      </div>

      <!-- 中央: ステータス情報 -->
      <div class="bg-white rounded-lg shadow-md mb-4">
        <div
          :class="getStatusClass(work.status)"
          class="w-full text-center py-2 text-lg font-bold rounded-t-lg text-white mb-2"
        >
          <h1 class="text-lg">{{ work.status }}</h1>
          <p class="text-sm">{{ formatDeadline(work.deadline) }}</p>
      </div>
        <div class="grid grid-cols-3 gap-2 px-2 pb-2">
          <button
            v-for="action in actions"
            :key="action.label"
            :class="action.class"
            @click="handleAction(action.label)"
            class="py-2 rounded-lg text-white text-sm font-bold"
          >
            {{ action.label }}
          </button>
        </div>
      </div>

      <!-- 下部: チャット欄 -->
      <div class="bg-white rounded-lg shadow-md p-4 flex flex-col h-64">
        <div class="flex-1 overflow-y-auto mb-4">
          <p
            v-for="(message, index) in chatMessages"
            :key="index"
            class="text-gray-700 mb-2"
          >
            {{ message }}
          </p>
        </div>
        <div class="flex">
          <input
            v-model="newMessage"
            type="text"
            placeholder="メッセージを入力"
            class="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            @click="sendMessage"
            class="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from '@/assets/data.json'

export default {
  name: 'WorkDetail',
  props: ['id'],
  data () {
    return {
      work: {}, // APIやルートパラメータから取得予定
      chatMessages: [], // 仮のチャットデータ
      newMessage: '',
      actions: [
        { label: '着手する', class: 'bg-orange-500 hover:bg-orange-600' },
        { label: '承認する', class: 'bg-green-500 hover:bg-green-600' },
        { label: '差し止め', class: 'bg-red-500 hover:bg-red-600' }
      ]
    }
  },
  methods: {
    async fetchWorkData () {
      try {
        // 受け取った ID に該当するデータを検索
        const work = data.find((item) => item.id === parseInt(this.id, 10))
        if (work) {
          this.work = work // 該当データをセット
        } else {
          console.error('該当するデータが見つかりません')
        }
      } catch (error) {
        console.error('データの取得に失敗しました:', error)
      }
    },
    openLink (url) {
      window.open(url, '_blank')
    },
    formatDeadline (deadline) {
      return deadline || '未設定'
    },
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
    getStatusClass (status) {
      switch (status) {
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
    handleAction (action) {
      console.log(`${action} が実行されました`)
    },
    sendMessage () {
      if (this.newMessage.trim()) {
        this.chatMessages.push(this.newMessage.trim())
        this.newMessage = ''
      }
    }
  },
  async mounted () {
    // ルートパラメータやAPIから詳細データを取得
    // const id = this.$route.params.id // 例: `WorkDetail/:id`
    console.log('受け取ったID:', this.id)
    await this.fetchWorkData()
  }
}
</script>

<style scoped>
/* 必要に応じてスタイルを調整 */
</style>
