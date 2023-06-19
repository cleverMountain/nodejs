const http = require('http')
const fs = require('fs')
const path = require('path')

// 1.创建一个服务器
const server = http.createServer()

// 2.为服务器绑定一个request事件，监听客户端请求
server.on('request', (req, res) => {
  // req请求对象，包括URL与method通过这个来写接口
  console.log(req.url)
  // res,响应给客户端-8
  fs.readFile(path.join(__dirname, './1.html'), 'utf-8', (err, data) => {
    if (err) return res.end('page not found')
    res.setHeader('Content-Type', 'text/html; charset=utf-8'); // 设置响应头，解决中文乱码
    res.end(data)
  })
})
// 3.启动服务器
server.listen(8080, () => {
  console.log('服务器启动在 http://127.0.0.1:8080')
})