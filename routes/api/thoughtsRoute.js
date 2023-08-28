const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  addNewThought,
  updateThought,
  removeThought,
  addNewReaction,
  removeReaction,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(addNewThought);

// /api/thoughts/:thoughtId
router
 .route('/:thoughtId')
 .get(getOneThought)
 .put(updateThought)
 .delete(removeThought);

router.route('/:thoughtId/reactions').post(addNewReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;