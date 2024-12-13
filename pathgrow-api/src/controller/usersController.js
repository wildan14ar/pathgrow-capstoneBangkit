const usersModel = require('../models/usersModel')

const getAllUsers = async (req, res) => {
  const [data] = await usersModel.getAllUsers();


  res.json({
    message: 'GET All Users success',
    data: data
  })
}

const createNewUser = (req, res) => {
  console.log(req.body);
  res.json({
    message: 'CREATE New User success',
    data: req.body
  })
}

const updateUser = (req, res) => {
  const { userID } = req.params;
  console.log('userID: ', userID);
  res.json({
    message: 'UPDATE User success',
    data: req.body
  })
}

const deleteUser = (req, res) => {
  const { userID } = req.params;
  res.json({
    message: 'DELETE User success',
    data: {
      id: userID,
      name: "Jue Gerent",
      username: "jueviole",
      email: "jueviole@gmail.com",
      password: "jueviole"
    }
  })
}

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
}