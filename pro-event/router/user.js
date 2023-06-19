// 用户路由
const express = require('express')
const router = express.Router()
const userMethods = require('../router_handler/user.js')

// 挂载路由

// 注册信用户
router.post('/reguser', userMethods.regUser)

// 登录
router.post('/login', userMethods.login)


module.exports = router