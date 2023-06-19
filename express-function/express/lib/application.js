const http = require('http')
const url = require('url')
const Router = require('./router/index.js')
// Application,整个express的整个应用系统
function Application() {
  // this._router = [
  //   {
  //     path: '*',
  //     method: '*',
  //     handler(req, res) {
  //       res.end(`Cannot found ${req.url} ${req.method}`)
  //     }
  //   }
  // ]
  this._router = new Router()
}

Application.prototype.get = function (path, handler) {
  // this._router.push({
  //   path,
  //   method: 'get',
  //   handler
  // })
  this._router.get(path, handler)
}
Application.prototype.listen = function (...argues) {
  let server = http.createServer((req, res) => {
    // let { pathname } = url.parse(req.url)
    // console.log(this._router)
    // for (let i = 1; i < this._router.length; i++) {
    //   let { path, method, handler } = this._router[i]
    //   if (path === pathname && method === req.method.toLowerCase()) {
    //     return handler(req, res)
    //   }
    // }
    // return this._router[0].handler(req, res)
    // 路由系统无法处理时调用done方法
    function done (req, res) {
      res.end( res.end(`Cannot found ${req.url} ${req.method}`))
    }
    this._router.handle(req, res)
  })
  server.listen(...argues)
}


module.exports = Application