const dbPool = require('../config/mysql');

// Get all users  
const getAllUsers = () => {
  const SQLQuery = 'SELECT * FROM users';
  return dbPool.execute(SQLQuery);
};


// Create new user
const createNewUser = (body) => {
  const SQLQuery = `INSERT INTO users (name, username, email, password)
                    VALUES (?, ?, ?, ?)`;
  return dbPool.execute(SQLQuery, [body.name, body.username, body.email, body.password]);
};


// Find user by email or username
const findUserByEmailOrUsername = (emailOrUsername) => {
  const SQLQuery = `SELECT * FROM users WHERE email = ? OR username = ?`;
  return dbPool.execute(SQLQuery, [emailOrUsername, emailOrUsername]);
};


// Update user by ID
const updateUser = (body, userID) => {
  const SQLQuery = `UPDATE users SET name = ?, username = ? WHERE id = ?`;
  return dbPool.execute(SQLQuery, [body.name, body.username, userID]);
};

// Delete user by ID
const deleteUser = (userID) => {
  const SQLQuery = `DELETE FROM users WHERE id = ?`;
  return dbPool.execute(SQLQuery, [userID]);
};

module.exports = {
  getAllUsers,
  createNewUser,
  findUserByEmailOrUsername,
  updateUser,
  deleteUser,
};
