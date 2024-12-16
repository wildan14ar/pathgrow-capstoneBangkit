const bcrypt = require('bcrypt');
const userModel = require('../model/usersModel');

const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({
      message:
        'All fields are required.'
    });
  }

  try {
    // Check if user already exists
    const [existingUsers] = await userModel.findUserByEmailOrUsername(email);
    if (existingUsers.length > 0) {
      return res.status(400).json({
        message: 'Email or Username already exists.'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await userModel.createNewUser({ name, username, email, password: hashedPassword });

    res.status(201).json({
      message: 'User registered successfully.'
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({
      message: 'All fields are required.'
    });
  }

  try {
    // Check if user exists
    const [users] = await userModel.findUserByEmailOrUsername(emailOrUsername);
    if (users.length === 0) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    const user = users[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid Password.'
      });
    }

    res.status(200).json({
      message: 'Login successful.',
      user: { id: user.id, name: user.name, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
