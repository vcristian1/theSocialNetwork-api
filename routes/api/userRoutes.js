//Alter so routes are getting Users data
const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/courseController.js');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/user/userID
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// /api/courses/:userId/friends/friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;