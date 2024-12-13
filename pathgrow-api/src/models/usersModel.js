const dbPool = require('../config/mysql')

const getAllUsers = () => {
  const sqlQuery = 'SELECT * FROM users';
  
  return dbPool.execute(sqlQuery);
}

module.exports = {
  getAllUsers,
}