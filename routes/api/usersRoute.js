const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  addNewUser,
  updateUser,
  removeUser,
  addNewFriend,
  removeFriend,
} = require('../../controllers/usersController');

// /api/users
router.route('/').get(getAllUsers).post(addNewUser);

// /api/users/:userId
router.route('/:userId').get(getOneUser).delete(removeUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(removeFriend);

module.exports = router;