const express = require('express')
// 生成token
const jwt = require('jsonwebtoken') // 将用户信息生成token
const expressJwt = require('express-jwt') // 将token还原成用户信息字符串
const cors = require('cors') // 解决跨域

const app = express()
// 在注册路由之前
app.use(cors())
// 获取表单body
app.use(express.urlencoded({extended: false}))

// 定义secret密钥，对用户信息进行加密，最终得到加密好的JWT字符串
const secretKey = 'hjl no1 ^_^' // 任意字符串

// 将JWT字符串(token)解析还原成JSON对象的中间件,
// expressJwt({secret: secretKey})用来解析token的中间件
// unless({path: [/^\/api\//]})指定哪些接口不需要访问权限
// 只要配置成功了expressJwt这个中间件，就可以把解析出来的用户信息挂在到req.user属性上
app.use(expressJwt({secret: secretKey}).unless({path: [/^\/api\//] }))

// 全局错误中间件捕获jwt错误
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      msg: 'token不合法,请重新登录'
    })
  }
  res.send({
    status: 500,
    msg: '未知错误'
  })
})

// 登录接口
app.post('/api/login', (req, res) => {
  if(req.query.uname !== 'admin' || req.query.upwd !== '123456') {
   return res.send('请输入正确的用户名和密码')
  }
  /**
   * token：jwt.sign()
   * 参数1：用户的信息
   * 参数2：加密的密钥
   * 参数3：配置对象，可以配置token的有效期
   */
  const token = jwt.sign(
    {uname: req.query.uname},
    secretKey,
    {
      expiresIn: '30s'
    }
  )
  res.send({
    status: 200,
    msg: '登陆成功',
    token
  })
})

// 获取用户信息
app.post('/admin/getInfo', (req, res) => {
  // 在客户端请求时，需要在header中加一个Authorization属性， 值就是Bearer + token
  console.log(req.user)
  res.send({
    status: 200,
    msg: '登陆成功',
    data: {
      user: req.user
    }
  })
})

// 退出登录
app.post('/api/logout', (req, res) => {
  
})


app.listen(8080, () => {
  console.log('服务启动在: http://127.0.0.1:8080')
})