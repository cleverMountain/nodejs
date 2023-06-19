const express = require('express')

const bodyParse = require('./8.myBodyParse.js') // 导入自定义中间件
const app = express()


app.use(bodyParse) // 注册

app.post('/user', (req, res) => {

  console.log(req.body)
  res.send('123')
})
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})

