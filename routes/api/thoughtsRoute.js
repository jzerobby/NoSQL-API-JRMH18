const express = require('express');
const router = express.Router();
const thoughtsController = require('../controllers/thoughtsController');

router.route('/')
.get(thoughtsController.getAllThoughts)
.post(thoughtsController.createThought);

// Route: /api/thoughts
router.route('/thoughts')
.get(async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
})
.post(async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;
    const newThought = new Thought({ thoughtText, username });
    const thought = await newThought.save();

    // Push the created thought's _id to the associated user's thoughts array field
    const user = await User.findById(userId);
    user.thoughts.push(thought._id);
    await user.save();

    res.json(thought);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Route: /api/thoughts/:thoughtId
router.route('/thoughts/:thoughtId')
.get(async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    res.json(thought);
  } catch (err) {
    res.status(404).json({ message: 'Thought not found' });
  }
})
.put(async (req, res) => {
  try {
    const { thoughtText } = req.body;
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: { thoughtText } },
      { new: true }
    );
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data or Thought not found' });
  }
})
.delete(async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndRemove(req.params.thoughtId);
    res.json(deletedThought);
  } catch (err) {
    res.status(404).json({ message: 'Thought not found' });
  }
});

module.exports = router;
