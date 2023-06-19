const fs = require('fs')

// fs.writeFile(file, data[, options], callback)
fs.writeFile('a.txt', 'node.js', 'utf8', (err) => {
  console.log(err)
})