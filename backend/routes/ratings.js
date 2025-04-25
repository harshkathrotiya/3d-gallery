const express = require('express');
const {
  getRatings,
  getRating,
  addRating,
  updateRating,
  deleteRating
} = require('../controllers/ratings');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router.route('/').get(getRatings).post(protect, addRating);
router.route('/:id').get(getRating).put(protect, updateRating).delete(protect, deleteRating);

module.exports = router;
