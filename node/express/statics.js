const express = require('express')

const app= express()

// express.static(),对外提供静态资源

// app.use(express.static('./file'))
app.use(express.static('./clock/index.html'))


app.listen(8080, () => {
  console.log('服务启动在 http://127.0.0.1:8080')
})