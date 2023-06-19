const user = 'li'

function say () {
  console.log('我是li')
  return 1
}
// 使用module.exports导出，可以打印module
// module.exports默认是一个空对象
module.exports.name = 'li'
module.exports.eat = function () {}
console.log(module)
// module.exports = {
//   say
// }