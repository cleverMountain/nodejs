const express = require('express')


const app = express()

// 定义一个中间件，中间件就是一个函数，通过next()向后面传递
const mv = function (req, res, next) {
  console.log('简单的中间件')
  next() // 必须通过next向后传递
}

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})

