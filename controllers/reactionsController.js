const Thought = require('../models/Thought');

const reactionsController = {
  createReaction: async (req, res) => {
    try {
      const { reactionBody, username } = req.body;
      const newReaction = { reactionBody, username };
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.push(newReaction);
      await thought.save();
      res.json(thought);
    } catch (err) {
      res.status(400).json({ message: 'Invalid data or Thought not found' });
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.id(req.body.reactionId).remove();
      await thought.save();
      res.json(thought);
    } catch (err) {
      res.status(404).json({ message: 'Thought or Reaction not found' });
    }
  },
};

module.exports = reactionsController;
