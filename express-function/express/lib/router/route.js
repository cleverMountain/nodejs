const Layer = require('./layer.js')

function Route () {
  this.stack = []
}

Route.prototype.get = function (handler) {
  let layer = new Layer(handler)
  layer.method = 'get'
  this.stack.push(this.stack)
}
Route.prototype.dispatch = function () {}
module.exports = Route