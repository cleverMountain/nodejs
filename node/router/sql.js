const mysql = require('mysql')

// 2.建立与MySQL数据库的连接关系
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01'
})

async function getData(id) {
  
  db.query('select * from users', (err, res) => {
    if (err) return console.log(err)
    // console.log(res)
    return res
  })
  

}

module.exports = {
  getData
}