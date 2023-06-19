const http = require('http')
const url = require('url')
let router = [
  {
    path: '*',
    method: '*',
    handler(req, res) {
      res.end(`Cannot found ${req.url} ${req.method}`)
    }
  }
] // 所有路由

function createApplication() {
  return {
    get(path, handler) {
      router.push({
        path,
        method: 'get',
        handler
      })
    },
    listen(...argues) {
      let server = http.createServer((req, res) => {
        let { pathname } = url.parse(req.url)
        console.log(router)
        for (let i = 1; i < router.length; i++) {
          let { path, method, handler } = router[i]
          if (path === pathname && method === req.method.toLowerCase()) {
            return handler(req, res)
          }
        }
        return router[0].handler(req, res)
      })
      server.listen(...argues)
    }
  }
}

module.exports = createApplication