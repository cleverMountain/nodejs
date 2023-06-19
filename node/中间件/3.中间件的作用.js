const express = require('express')


const app = express()

// 定义一个中间件，中间件就是一个函数，通过next()向后面传递
const mv = function (req, res, next) {
  // 获取请求到服务器的时间
  const time = Date.now()
  // 为req对象挂在自定义属性，从而把时间共享给后面所有路由
  req.startTime = time
  // console.log(req, res)
  next() // 必须通过next向后传递
}
app.use(mv) // 注册全局中间件


app.get('/user', (req, res) => {
  res.send('请求成功' + req.startTime)
})
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})


/**
 * 多个中间件，共享一份req和res
 */