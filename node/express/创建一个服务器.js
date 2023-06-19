const express = require('express')

// 1.创建服务器
const app = express()

// 3.监听get,post请求，并返回数据
app.get('/user', (req, res) => {
  // get响应一个JSON对象
  res.send({
    name: 'li',
    age: '20'
  })
})
app.post('/user', (req, res) => {
  // post可以响应文本也可以响应JSON对象 
  res.send('请求成功')
})
app.get('/account/:id/:name', (req, res) => {
  // http://127.0.0.1:8080/account/5/li
  // 获取参数
  console.log(req.params)
  res.send(req.params)
})
// 2.启动服务器
app.listen(8080, () => {
  console.log('服务启动在 http://127.0.0.1:8080')
})