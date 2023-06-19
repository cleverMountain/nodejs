const express = require('express')


const app = express()





app.get('/user', (req, res) => {
  throw new Error('服务器内部错误')
  res.send('请求成功' + req.startTime)
})

// 错误中间件，注册在所有路由之后
const handleErr = (err, req, res, next) => {
  console.log(err.message)
  res.send(err.message)
}
app.use(handleErr)

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
