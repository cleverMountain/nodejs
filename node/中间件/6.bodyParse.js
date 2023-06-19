const express = require('express')
const bodyParser = require('body-parser')


const app = express()
// 注册
app.use(bodyParser.urlencoded({extended: false}))

// 获取解析表单数据的中间件bodyParser
app.post('/user', (req, res) => {
  console.log(req.body.name)
  res.send('请求成功')
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})

