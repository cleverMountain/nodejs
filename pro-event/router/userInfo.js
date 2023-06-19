// 用户路由
const express = require('express')
const router = express.Router()
const methods = require('../router_handler/userInfo.js')

// 挂载路由

// 获取用户
router.post('/userinfo', methods.getUserInfo)

// 修改密码
router.post('/updateupwd', methods.upDateUpwd)



module.exports = router