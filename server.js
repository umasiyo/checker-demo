// server.js
const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors') // corsモジュールをインポート

const app = express()
const PORT = 3000

// CORSを許可
app.use(cors({
  origin: 'http://localhost:8080' // フロントエンドのURLを指定
}))

// JSONデータのパス
const dataPath = path.join(__dirname, './src/assets/data.json')

// JSONデータを解析するためのミドルウェア
app.use(express.json())

// 新しいデータを追加するAPIエンドポイント
app.post('/api/addData', (req, res) => {
  try {
    const newData = req.body

    // data.json を読み込んで、データを追加
    fs.readFile(dataPath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err) // エラーログを表示
        return res.status(500).json({ message: 'Error reading data file' })
      }

      const currentData = JSON.parse(data)
      newData.id = currentData.length + 1 // 新しいIDを追加

      // 新しいデータを配列に追加
      currentData.push(newData)

      // 更新したデータをdata.jsonに保存
      fs.writeFile(dataPath, JSON.stringify(currentData, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err) // エラーログを表示
          return res.status(500).json({ message: 'Error writing to data file' })
        }
        res.status(200).json({ message: 'データが追加されました！' }) // レスポンスを送信
      })
    })
  } catch (error) {
    console.error('Error occurred while adding data:', error) // エラー詳細を表示
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
