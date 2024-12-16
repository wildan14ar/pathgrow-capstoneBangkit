const usersModel = require('../model/usersModel');

const getAllUsers = async (req, res) => {
  try {
    const [data] = await usersModel.getAllUsers();
    res.json({
      message: 'GET All Users success', data
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const updateUser = async (req, res) => {
  const { userID } = req.params;
  const { name, username } = req.body;

  if (!name && !username) {
    return res.status(400).json({
      message: 'At least one field (name or username) is required to update.'
    });
  }

  try {
    const [result] = await usersModel.updateUser({ name, username }, userID);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    res.json({ message: 'UPDATE User success', data: { id: userID, name, username } });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const deleteUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const [result] = await usersModel.deleteUser(userID);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    res.json({ message: 'DELETE User success' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
};
