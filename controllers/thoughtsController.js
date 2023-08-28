const { ObjectId } = require('mongoose').Types;
const { User, Thought}  = require('../models');

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) =>  res.status(500).json(err));
  },

  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((thought) => res.json(thought)) 
    .catch((err) => res.status(500).json(err));
  },

  async addNewThought(req, res) {
    try {
      const newThought = await Thought.create(req.body)
      if (newThought) {
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: newThought._id } },
          { new: true }
        );
      }
      res.json('Thought created')
    } catch (err) { res.status(500).json(err) }
  },

  updateThought(req,res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      { $set: req.body }, 
      { new: true }
    )
    .then((thought) => res.json(thought)) 
    .catch((err) => res.status(500).json(err));
  },

  async removeThought(req, res) {
    try {
      const deleteThought = await Thought.create(req.body)
      if (deleteThought) {
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $pull: { thoughts: deleteThought._id } },
          { new: true }
        );
      }
      res.json('Thought removed')
    } catch (err) { res.status(500).json(err) }
  },

  addNewReaction(req, res) {
    console.log('You are adding a reaction');
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    ) 
    .then((thought) => res.json(thought)) 
    .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    console.log('You are removing a reaction');
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    ) 
    .then((thought) => res.json(thought)) 
    .catch((err) => res.status(500).json(err));
  }
};