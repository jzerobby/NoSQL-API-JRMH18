const { ObjectId } = require('mongoose').Types;
const { User, Thought}  = require('../models');
const { create } = require('../models/User')

module.exports = {
  getAllUsers(req, res) {
    User.find()
    .then(async (users) => {
      const userObj = {
        users,
        headCount: await headcount(),
      };
      return res.json(userObj);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },

  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then(async (users) =>
      !users
        ? res.status(404).json({ message: 'No user ID found' })
        : res.json({
          user,
          grade: await grade(red.params.userId),
        })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },

  addNewUser(req,res) {
    User.create(req.body)
    .then((user) => res.json(user)) 
    .catch((err) => res.status(500).json(err));
  },

  updateUser(req,res) {
    User.update(req.body)
    .then((user) => res.json(user)) 
    .catch((err) => res.status(500).json(err));
  },

  removeUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
    .then((user) =>
      !user
      ? res.status(404).json({ message: 'No user found' })
      :Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId} },
        { new: true }
      )
    ) 
    .then((thought) =>
     !thought
     ? res.status(404).json({
      message: 'User removed, but no thoughts found'
     })
     : res.json({ message: 'User successfully removed'})
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  },

  addNewFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
    ) 
    .then((user) =>
     !user
      ? res
        .status(404)
        .json({ message: "No user ID found" })
      : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { thought: { thoughtId: req.params.thoughtId } } },
      { runValidators: true, new: true }
    )
    .then((user) =>
     !user
      ? res
        .status(404)
        .json({ message: "No user ID found" })
      : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
};