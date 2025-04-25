const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Rating = require('../models/Rating');
const Model = require('../models/Model');

// @desc    Get ratings
// @route   GET /api/ratings
// @route   GET /api/models/:modelId/ratings
// @access  Public
exports.getRatings = asyncHandler(async (req, res, next) => {
  if (req.params.modelId) {
    const ratings = await Rating.find({ model: req.params.modelId })
      .populate({
        path: 'user',
        select: 'name avatar'
      });

    return res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single rating
// @route   GET /api/ratings/:id
// @access  Public
exports.getRating = asyncHandler(async (req, res, next) => {
  const rating = await Rating.findById(req.params.id)
    .populate({
      path: 'user',
      select: 'name avatar'
    });

  if (!rating) {
    return next(
      new ErrorResponse(`No rating found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: rating
  });
});

// @desc    Add rating
// @route   POST /api/models/:modelId/ratings
// @access  Private
exports.addRating = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.model = req.params.modelId;

  const model = await Model.findById(req.params.modelId);

  if (!model) {
    return next(
      new ErrorResponse(`No model with the id of ${req.params.modelId}`, 404)
    );
  }

  // Check if user has already rated this model
  const existingRating = await Rating.findOne({
    user: req.user.id,
    model: req.params.modelId
  });

  if (existingRating) {
    return next(
      new ErrorResponse(`You have already rated this model`, 400)
    );
  }

  const rating = await Rating.create(req.body);

  res.status(201).json({
    success: true,
    data: rating
  });
});

// @desc    Update rating
// @route   PUT /api/ratings/:id
// @access  Private
exports.updateRating = asyncHandler(async (req, res, next) => {
  let rating = await Rating.findById(req.params.id);

  if (!rating) {
    return next(
      new ErrorResponse(`No rating with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure rating belongs to user or user is admin
  if (rating.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to update rating`, 401));
  }

  rating = await Rating.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  rating = await Rating.findById(rating._id)
    .populate({
      path: 'user',
      select: 'name avatar'
    });

  res.status(200).json({
    success: true,
    data: rating
  });
});

// @desc    Delete rating
// @route   DELETE /api/ratings/:id
// @access  Private
exports.deleteRating = asyncHandler(async (req, res, next) => {
  const rating = await Rating.findById(req.params.id);

  if (!rating) {
    return next(
      new ErrorResponse(`No rating with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure rating belongs to user or user is admin
  if (rating.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to delete rating`, 401));
  }

  await rating.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
