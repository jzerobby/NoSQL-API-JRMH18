const express = require('express');
const router = express.Router();
const reactionsController = require('../controllers/reactionsController');

router.route('/')
.post(reactionsController.createReaction)
.delete(reactionsController.deleteReaction);

// Route: /api/thoughts/:thoughtId/reactions
router.route('/thoughts/:thoughtId/reactions')
.post(async (req, res) => {
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
})
.delete(async (req, res) => {
try {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.id(req.body.reactionId).remove();
    await thought.save();
    res.json(thought);
} catch (err) {
    res.status(404).json({ message: 'Thought or Reaction not found' });
}
});

module.exports = router;