const db = require('../db/index.js')


exports.getUserInfo = (req, res) => {
  console.log(req.user.id) // token信息
  db.query('select * from ev_users where id=?', req.user.id, (err, ret) => {
    if (err) return res.handler(err)
    res.send({
      status: 200,
      data: ret
    })
  })
}




exports.upDateUpwd = (req, res) => {
  const upwd = 111111
  db.query('update ev_users set upwd=? where id=?', [upwd, req.user.id], (err, ret) => {
    if (err) return res.handler(err)
    res.send({
      status: 200,
      msg: '密码重置成功'
    })
  })
}