const express = require('express')


const app = express()

// 定义一个中间件，中间件就是一个函数，通过next()向后面传递
const mv = function (req, res, next) {
  console.log('简单的中间1件')
  console.log(req.param)
  next() // 必须通过next向后传递
}
app.use(mv) // 注册全局中间件


// app.post('/user', (req, res) => {
//   res.send('请求成功')
// })
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})