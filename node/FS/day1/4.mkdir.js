const fs = require('fs')
const path = require('path')

// 创建文件夹
fs.mkdir(path.resolve(__dirname, './arr'),function (err) {
  if (err) {
    console.log(err)
    return
  }
  // 创建文件
  fs.appendFile(path.resolve(__dirname, './arr/a.txt'),'321',function (err) {
    if (err) {
      console.log(err)
      return
    }
    fs.writeFile(path.resolve(__dirname, './arr/a.txt'), 'node.js1', 'utf8', (err) => {
      console.log(err)
    })
  })
})
