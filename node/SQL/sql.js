/**
 * 
-- 插入数据, 表名，对应数据
-- insert into users (username, password) values ('zhou', 444444)

-- 查询username与password 对应数据
-- select username, password from users

-- update 修改数据,表名
-- update users set password='555555' where id=4
-- update users set username='happy', password='666666', status=1 where id=1


-- 删除
-- delete from users where id=4

-- where子句
-- select * from users where id>2

-- AND与OR运算符
-- select * from users where id>2 and status=0

-- ORDER BY 子句：asc排序升序(默认)   DESC 降序
-- select * from users order by status
-- select * from users order by id desc

-- count(*) 条数，有多少条,通过as作为别名
-- select count(*) as total from users where status=0
select username as uname, password as upwd from users
-- select * from users

 */

// 1.导入数据库
const mysql = require('mysql')

// 2.建立与MySQL数据库的连接关系
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01'
})



// 插入？？占位符号，占位符使用数组代替
// db.query('insert into users (username, password) values (?, ?)', ['huang', 888888], (err, res) => {
//   if(err) return console.log(err.message)
//   if (res.affectedRows === 1) {
//     console.log('插入成功')
//   }
// })

// 便捷插入
// const user = { username: 'harry', password: '666666' }
// const sqpStr = 'insert into users set ?'
// db.query(sqpStr, user, (err, res) => {
//   if (err) return console.log(err.message)
//   if (res.affectedRows === 1) {
//     console.log('插入成功')
//   }
// })

// 更新
// db.query('update users set username=?, password=? where id=14', ['huang1', 8888881], (err, res) => {
//   if(err) return console.log(err.message)
//   if (res.affectedRows === 1) {
//     console.log('更新成功')
//   }
// })

// 便捷更新
// const user = { username: 'harry', password: '666666'}
// const sqpStr = 'update users set ? where id=?'
// db.query(sqlStr, [user, 16], (err, res) => {
//   if(err) return console.log(err.message)
//   if (res.affectedRows === 1) {
//     console.log('更新成功')
//   }
// })


// 删除数据
db.query('delete from users where id=?', 1, (err, res) => {
  if (err) return console.log(err.message)
  if(err) return console.log(err.message)
  if (res.affectedRows === 1) {
    console.log('删除成功')
  }
})

// 查询
// 测试mysql模块是否正常工作, 使用sql语句
db.query('select * from users', (err, res) => {
  if (err) return console.log(err.message)
  console.log(res)
})