const Route = require('./route.js')
const Layer = require('./layer.js')


// 路由系统
function Router () {
  this.stack = []
}

Router.prototype.route = function (path) {
  let route = new Route()
  // 如果layer匹配到路径就交给route来处理
  let layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route // 把route放到layer中
  this.stack.push(layer) // 把layer放到数组中
  return route
}
// 调用get方法，创建layer，而且每一个layer上因该有一个route，还要
// 将get方法中的handler传入到route中,route中将handler存起来
Router.prototype.get = function (path, handler) {
  let route = this.route(path) // 把路径将给
  route.get(handler) // 把handler交给route自身去处理
}
Router.prototype.handle = function (req, res, out) {
  // 请求到来 执行此方法
}

module.exports = Router