const express = require('express');
const {
  getTutorials,
  getTutorial,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  uploadTutorialThumbnail,
  incrementViewCount,
  getFeaturedTutorials,
  getTutorialsByCategory,
  getTutorialsByDifficulty,
  getTutorialsByTag
} = require('../controllers/tutorials');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.route('/').get(getTutorials);
router.route('/featured').get(getFeaturedTutorials);
router.route('/category/:category').get(getTutorialsByCategory);
router.route('/difficulty/:difficulty').get(getTutorialsByDifficulty);
router.route('/tag/:tag').get(getTutorialsByTag);
router.route('/:id').get(getTutorial);
router.route('/:id/view').put(incrementViewCount);

// Protected routes
router.use(protect);
router.route('/').post(createTutorial);
router.route('/:id').put(updateTutorial).delete(deleteTutorial);
router.route('/:id/thumbnail').post(uploadTutorialThumbnail);

module.exports = router;
