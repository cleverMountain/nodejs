// 大小写转化
function trans (str, transTo) {
  if (transTo === 1) {
    return str.toLocaleLowerCase()
  } else {
    return str.toUpperCase()
  }
}

// 导出
module.exports = {
  trans
}