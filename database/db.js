const config=require('../config.json').db
const mysql=require('mysql2')

module.exports=mysql.createPool({
    host:config.host,
    user:config.username,
    password:config.password,
    database:config.database,
    waitForConnections:true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
})