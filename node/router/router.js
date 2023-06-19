// // 导入sql模块
// const mysql = require('./sql.js')
// let a = mysql.getData()
// console.log(a)
// const { query } = require('express')
// 1.导入express模块
const express = require('express')
 

// 2.创建路由对象
const router = express.Router()


// 3.挂在路由
router.get('/list', (req, res) => {
  // res.send('uesr list')
  const query = req.query
  res.send({
    status: 200,
    msg: 'ok',
    data: query
  })
})
router.post('/add', (req, res) => {
  // 获取body,需停通过urlencoded中间件
  const body = req.body
  res.send({
    status: 200,
    msg: 'ok',
    data: body
  })
})
// 4.导出路由对象
module.exports = router