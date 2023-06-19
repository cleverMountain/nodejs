const fs = require('fs')

// fs.readFile(path[, options], callback) 三个参数[]非必填， 其他必填 
fs.readFile('./1', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})