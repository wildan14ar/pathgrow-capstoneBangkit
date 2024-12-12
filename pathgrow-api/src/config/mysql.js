const mysql = require('mysql2');

const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Kepiting_28!',
  database: 'db_pathgrow'
})

module.exports = dbPool.promise();