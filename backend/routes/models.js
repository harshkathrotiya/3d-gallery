const express = require('express');
const {
  getModels,
  getModel,
  createModel,
  updateModel,
  deleteModel,
  uploadModelFile,
  uploadModelThumbnail,
  incrementDownloadCount,
  incrementViewCount,
  getFeaturedModels,
  getModelsByCategory,
  getModelsByTag
} = require('../controllers/models');

// Include other resource routers
const commentRouter = require('./comments');
const ratingRouter = require('./ratings');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:modelId/comments', commentRouter);
router.use('/:modelId/ratings', ratingRouter);

// Public routes
router.route('/').get(getModels);
router.route('/featured').get(getFeaturedModels);
router.route('/category/:category').get(getModelsByCategory);
router.route('/tag/:tag').get(getModelsByTag);
router.route('/:id').get(getModel);
router.route('/:id/view').put(incrementViewCount);

// Protected routes
router.use(protect);
router.route('/').post(createModel);
router.route('/:id').put(updateModel).delete(deleteModel);
router.route('/:id/upload').post(uploadModelFile);
router.route('/:id/thumbnail').post(uploadModelThumbnail);
router.route('/:id/download').put(incrementDownloadCount);

module.exports = router;
