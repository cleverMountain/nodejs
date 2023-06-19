const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user.js')
const infoRouter = require('./router/userInfo.js')
const config = require('./config.js')
const expressJwt = require('express-jwt') // 规定访问权限

const app = express()
// 配置解析表单数据的中间件该中间件只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended: false})) 
// 在全局中间件封装res.hanleder函数
app.use((req, res, next) => {
  res.handler = (err, status=201) => {
    // status默认值为201，表示失败
    // err,可能是一个错误对象，也可能是一个错误的描述字符串
    res.send({
      status,
      msg: err instanceof Error ? err.msg : err
    })
  }
  next()
})
// 访问权限,除api开头的路由不需要token
app.use(expressJwt({secret: config.jwtSecretKey}).unless({path: [/^\/api\//] }))
// 全局错误中间件捕获jwt错误
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') return res.handler('token不合法,请重新登录', 401)
  res.handler('未知错误', 500)
})


app.use(cors()) // 配置跨域
app.use('/api', userRouter)
app.use('/my', infoRouter)


app.listen(8080, () => {
  console.log('服务启动在: http://127.0.0.1:8080')
})