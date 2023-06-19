const express = require('express')


const app = express()


const mv1 = function (req, res, next) {
  const time = Date.now()
  req.startTime = time
  next() // 必须通过next向后传递
}
const mv2 = function (req, res, next) {
  console.log('中间件2')
  next() // 必须通过next向后传递
}


// 局部中间件
app.get('/user',[mv1 , mv2], (req, res) => {
  res.send('请求成功' + req.startTime)
})
app.get('/list', (req, res) => {
  res.send('请求成功' + req.startTime)
})
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
