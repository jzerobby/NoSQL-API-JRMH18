const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtsController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  createThought: async (req, res) => {
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
  },
};

module.exports = thoughtsController;
