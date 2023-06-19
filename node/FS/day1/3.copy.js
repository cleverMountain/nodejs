const fs = require('fs')
const path = require('path')

// __dirname 当前文件所处的目录 ./成绩与成绩的路径表示是一致的
fs.readFile(path.resolve(__dirname, './成绩'), 'utf8', (err, data) => {
  let str = ''
  if (err) throw err
  data.split(" ").map(item => {
    return item.replace(/\=/g, ":")
  }).forEach(ite => {
    str += ite + '\n'
  })
  fs.writeFile(path.resolve(__dirname, './成绩2'), str, 'utf8', (err) => {
    if (!err) {
      return console.log('拷贝成功')
    } else {
      throw err
    }
  })
})
