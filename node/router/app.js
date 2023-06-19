const express = require('express')
// const router  = require('./router.js')
// const cors = require('cors') // 解决跨域

const app = express()
// 获取表单body
// app.use(express.urlencoded({extended: false}))

// 使用JSONP方式解决跨域：只有get请求
/**
 * 1.获取客户端发送过来的回调函数
 * 2.得到要通过JSONP形式发送给客户端的数据
 * 3.根据前两步得到的数据，拼接出一个函数调用的字符串
 * 4.把拼接的得到的字符串，相应给客户端的<script></script>标签进行解析
 */
app.get('/user/jsonp', (req, res) => {
  // * 1.获取客户端发送过来的回调函数
  const cbName = req.query.callback
  // * 2.得到要通过JSONP形式发送给客户端的数据
  const data = {name: 'li', age: 20}
  console.log('收到请求')
  // * 3.根据前两步得到的数据，拼接出一个函数调用的字符串
  const scriptStr = `${cbName}(${JSON.stringify(data)})`
  // * 4.把拼接的得到的字符串，相应给客户端的<script></script>标签进行解析
  res.send(scriptStr)
})





// app.use(cors()) // 在路由注册之前

// app.use('/user', router) // 注册路由模块,添加前缀

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})