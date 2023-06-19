// 求和
function add (...params) {
  return Array.prototype.reduce.call(params, (current, i) => {
    return current += i
  }, 0)
  // return params.reduce((current, i) => {
  //   return current += i
  // }, 0)
}

// 导出
module.exports = {
  add
}