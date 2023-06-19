const express = require('./express/lib/express.js')

const app = express()

app.get('/', (req, res) => {

  res.end('hello')
})

app.listen(8080, () => {
  console.log('start at http://127.0.0.1:8080')
})