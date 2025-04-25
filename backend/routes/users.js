const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  updatePreferences
} = require('../controllers/users');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);

// Routes for all authenticated users
router.route('/avatar').post(uploadAvatar);
router.route('/favorites').get(getFavorites);
router.route('/favorites/:modelId').post(addToFavorites).delete(removeFromFavorites);
router.route('/preferences').put(updatePreferences);

// Routes restricted to admins
router.use(authorize('admin'));
router.route('/').get(getUsers);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
