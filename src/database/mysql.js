const { createConnection } = require('mysql')

const tableName = 't_user'
const dbConnection = createConnection({
  host: "123.56.143.183",
  user: "root",
  password: "12312300",
  database: "sso",
  port: "33066",
})
dbConnection.connect((err) => {
  if (err) {
    throw err
  }
  console.log("连接成功")
});

const _query = (sql) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, values, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
      dbConnection.release()
    })
  })
}

const registerUser = async (val) => {
  const sql = 'INSERT INTO t_user (username,password,icon,mobile,email,nick_name,createTime,updateTime) VALUES (?,?,?,?,?,NOW(),NOW());'
  const res = await _query(sql,val)
  console.info('res: ', res)
}

const checkNickNameIsExisted = async (nickName) => {
  const sql = `SELECT id FROM ${tableName} WHERE nick_name = '${nickName}'` 
  const res = await _query(sql)
  return !!res.length
}

module.exports = {
  registerUser,
  checkNickNameIsExisted
}