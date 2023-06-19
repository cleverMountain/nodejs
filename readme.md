### 1.fs模块

1. fs.readFile(path[, options], callback) 读取文件
2. fs.writeFile(file, data[, options], callback) 写入文件
3. path可以使用path模块处理(path.resolve(__dirname, './成绩')



### 2.http模块

1. 用于创建web服务器
```js
// 1.导入http模块
const http = require('http')
// 2.创建一个服务器实例
const server = http.createServer()

// 3.为服务器绑定一个request事件，监听客户端请求，有请求就会触发request事件
server.on('request', (req, res) => {
  // req请求对象，包括URL与method通过这个来写接口
  // res,响应给客户端-8
  res.setHeader('Content-Type', 'text/html; charset=utf-8'); // 设置响应头，解决中文乱码
    res.end({
      id: 1
    })
})
// 4.启动服务器
server.listen(8080, () => {
  console.log('服务器启动在 http://127.0.0.1:8080')
})
```



### 3.模块化规范





### 4.express模块

1. 创建简单web服务器
```js
// 1.引入express模块
const express = require('express')
// 2.创建服务器
const app = express()
// 3.监听get,post请求，并返回数据
app.get('/user', (req, res) => {
  // get响应一个JSON对象
  res.send({
    name: 'li',
    age: '20'
  })
})
// /user/1/2
app.post('/user/:id/:name', (req, res) => {
  // post可以响应文本也可以响应JSON对象 
  console.log(req)
  res.send('请求成功')
})
// 4.启动服务器
app.listen(8080, () => {
  console.log('服务启动在 http://127.0.0.1:8080')
})
```

2. 处理静态资源
```js
const express = require('express')
const app= express()
// 返回静态资源
app.use(express.static('./clock/index.html'))
app.listen(8080, () => {
  console.log('服务启动在 http://127.0.0.1:8080')
})
```

3. express路由模块化
```js
/**
 * 1.创建一个路由模块
*/
// 1.导入express模块
const express = require('express')
// 2.创建路由对象
const router = express.Router()
// 3.挂在路由
router.get('/list', (req, res) => {
  const query = req.query
  res.send({
    status: 200,
    msg: 'ok',
    data: query
  })
})
router.post('/add', (req, res) => {
  // 获取body,需停通过urlencoded中间件
  const body = req.body
  res.send({
    status: 200,
    msg: 'ok',
    data: body
  })
})
// 4.导出路由对象
module.exports = router



/**
 * 2.在app.js中使用路由模块
*/
const express = require('express')
// 1.导入路由模块
const router  = require('./router.js')
const app = express()
// 注册路由模块
app.use('/user', router) // 注册路由模块,添加前缀
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

4. express中间件
1.中间件就是一个函数，该函数包括req，res，cb三个参数，通过next()向后面传递,路由中间件是没有next参数的
```js
// 定义中间件
const mw = function (req, res, next) {
  console.log('简单的中间件')
  next() // 必须通过next向后传递
}
// 使用中间件(全局)
app.use(mw)
```
2.作用：多个中间件共享同一份req和res,可以在中间件操作请求对象req，与响应数据res
```js
const express = require('express')
const app = express()
// 定义一个中间件，中间件就是一个函数，通过next()向后面传递
const mv = function (req, res, next) {
  // 获取请求到服务器的时间
  const time = Date.now()
  // 为req对象挂在自定义属性，从而把时间共享给后面所有路由
  req.startTime = time
  next() // 必须通过next向后传递
}
app.use(mv) // 注册全局中间件
app.get('/user', (req, res) => {
  // 中间件给req添加了一个startTime属性
  res.send('请求成功' + req.startTime)
})
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

3.中间件分类：全局中间件，局部中间件(不适用app.use)，错误中间件（在路由注册之前使用中间件）
```js
// 局部中间件
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
// 局部中间件，多个使用数组连接或者mv1，mv2
app.get('/user',[mv1 , mv2], (req, res) => {
  res.send('请求成功' + req.startTime)
})
app.get('/list', (req, res) => {
  res.send('请求成功' + req.startTime)
})
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})



// 错误中间件
// 错误中间件，注册在所有路由之后，四个参数
const handleErr = (err, req, res, next) => {
  console.log(err.message)
  res.send(err.message)
}
app.use(handleErr)
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})



// 解析表单的中间件bodyParser
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// 注册
app.use(bodyParser.urlencoded({extended: false}))
// 解析表单中的json数据的中间件bodyParser
app.post('/user', (req, res) => {
  console.log(req.body.name)
  res.send('请求成功')
})
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```


4.自定义中间件
```js
/**
 * 1.自定义中间件
*/
const qs = require('querystring')
const bodyParse =  function (req, res, next) {
  // 中间件逻辑:解析表单数据
  // 1.监听数据变化data事件,可以监听到客户端发送过来的请求体数据
  let str = ''
  req.on('data', chunk => {
    // 持续触发，触发一次拼接一次
    str += chunk
    // 2.监听req.end事件，此时数据已经拼接完毕
  })
  req.on('end', () => {
    console.log(str)
    // 3.使用querystring模块解析请求数据
    const body = qs.parse (str)
    console.log(body)
    // 4.将解析出来的对象，挂在到req上，供下流使用
    req.body = body
    next() // 必须通过next向后传递
  })
}
module.exports = bodyParse


/**
 * 2.使用中间件
*/
const express = require('express')
// 导入自定义中间件
const bodyParse = require('./8.myBodyParse.js')
const app = express()
app.use(bodyParse) // 注册
app.post('/user', (req, res) => {
  console.log(req.body)
  res.send('123')
})
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```