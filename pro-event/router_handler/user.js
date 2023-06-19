const db = require('../db/index.js')
const bcrypt = require('bcryptjs') // 对密码进行加密
const jwt = require('jsonwebtoken') // 生成token
const config = require('../config.js')

let sqlStr = 'select * from ev_users where uname=?'

// 注册新用户的处理函数
exports.regUser = (req, res) => {
  console.log(req.query)
  const userInfo = req.query
  // 1.对表单数据进行校验
  if (!userInfo.uname || !userInfo.upwd) {
    return res.handler('用户名或账号不能为空')
  }
  // 2.检测数据库是否存在该用户
  sqlStr = 'select * from ev_users where uname=?'
  db.query(sqlStr, userInfo.uname, (err, ret) => {
    if (err) return res.handler(err)
    // 查重
    if (ret.length > 0) {
      return res.handler('该用户已经存在')
    }
    // 插入
    sqlStr = 'insert into ev_users set ?'
    userInfo.upwd = bcrypt.hashSync(userInfo.upwd, 10) // 加密
    console.log(userInfo)
    db.query(sqlStr, { uname: userInfo.uname, upwd: userInfo.upwd }, (err, ret) => {
      if (err) return res.handler(err)
      if (ret.affectedRows === 1) {
        res.handler('注册成功', 200)
      } else {
        res.handler('注册失败')
      }
    })
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  const userInfo = req.query
  // 找到用户
  sqlStr = 'select * from ev_users where uname=?'
  db.query(sqlStr, userInfo.uname, (err, ret) => {
    if (err) return res.handler(err)
    if (ret.length !== 1) return res.handler('登录失败')
    // 密码判断
    if (bcrypt.compareSync(userInfo.upwd, ret[0].upwd)) {
      const user = { ...ret[0], upwd: '' }
      // 生成token
      const token = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
      res.send({
        status: 200,
        msg: '登陆成功',
        token: 'Bearer ' + token
      })
    }
  })
}
