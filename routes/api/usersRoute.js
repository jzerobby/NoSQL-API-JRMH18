const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
.get(usersController.getAllUsers)
.post(usersController.createUser);

// The /api/users routes
router.route('/users')
.get(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
})
.post(async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Route: /api/users/:userId
router.route('/users/:userId')
.get(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
})
.put(async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { username, email } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data or User not found' });
  }
})
.delete(async (req, res) => {
  try {
    // Bonus: Removing associated thoughts of the user
    await Thought.deleteMany({ username: req.params.userId });

    const deletedUser = await User.findByIdAndRemove(req.params.userId);
    res.json(deletedUser);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});

// Route: /api/users/:userId/friends/:friendId
router.route('/users/:userId/friends/:friendId')
.post(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.push(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data or User not found' });
  }
})
.delete(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.pull(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});
  
module.exports = router;
