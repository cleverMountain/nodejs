const express = require('express')
const session = require('express-session') // 提供session
const cors = require('cors') // 解决跨域

const app = express()
// 在注册路由之前
app.use(cors())
// 获取表单body
app.use(express.urlencoded({extended: false}))
// 配置session
app.use(
  session({
    secret: 'hjl', // 任意字符串
    resave: false, // 固定写法
    saveUninitialized: true // 固定写法
  })
)

// 登录接口
app.post('/api/login', (req, res) => {
  console.log(req.query)
  if(req.query.uname !== 'admin' || req.query.upwd !== '123456') {
   return res.send('请输入正确的用户名和密码')
  }
  // 添加session信息,只有配置express-session,req才有session这个属性
  req.session.user = req.query
  req.session.isLogin = true // 登录状态
  res.send({
    status: 200,
    msg: 'success',
  })
})

// 获取用户信息
app.post('/api/user', (req, res) => {
  if(!req.session.isLogin) {
    return res.send({
      stats: 0,
      msg: '请先登录用户'
    })
  }
  res.send({
    status: 200,
    msg: 'success',
    session: req.session
  })
})

// 退出登录
app.post('/api/logout', (req, res) => {
  req.session.destroy()
  res.send({
    status: 200,
    msg: '退出登录'
  })
})


app.listen(8080, () => {
  console.log('服务启动在: http://127.0.0.1:8080')
})