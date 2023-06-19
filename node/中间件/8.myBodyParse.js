
const qs = require('querystring')
const bodyParse =  function (req, res, next) {
  // 中间件逻辑:解析表单数据
  // 1.监听数据变化data事件,并且拼接所有数据
  let str = ''
  req.on('data', chunk => {
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