const User = require('../models/User');

const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const newUser = new User({ username, email });
      const user = await newUser.save();
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: 'Invalid data' });
    }
  },
};

module.exports = usersController;
