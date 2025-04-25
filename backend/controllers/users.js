const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Model = require('../models/Model');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Upload user avatar
// @route   POST /api/users/avatar
// @access  Private
exports.uploadAvatar = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `avatar_${req.user.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/avatars/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await User.findByIdAndUpdate(req.user.id, { avatar: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Add model to favorites
// @route   POST /api/users/favorites/:modelId
// @access  Private
exports.addToFavorites = asyncHandler(async (req, res, next) => {
  const model = await Model.findById(req.params.modelId);

  if (!model) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.modelId}`, 404)
    );
  }

  const user = await User.findById(req.user.id);

  // Check if the model is already in favorites
  if (user.favorites.includes(req.params.modelId)) {
    return next(
      new ErrorResponse(`Model already in favorites`, 400)
    );
  }

  // Add to favorites
  user.favorites.push(req.params.modelId);
  await user.save();

  res.status(200).json({
    success: true,
    data: user.favorites
  });
});

// @desc    Remove model from favorites
// @route   DELETE /api/users/favorites/:modelId
// @access  Private
exports.removeFromFavorites = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  // Check if the model is in favorites
  if (!user.favorites.includes(req.params.modelId)) {
    return next(
      new ErrorResponse(`Model not in favorites`, 400)
    );
  }

  // Remove from favorites
  user.favorites = user.favorites.filter(
    id => id.toString() !== req.params.modelId
  );
  await user.save();

  res.status(200).json({
    success: true,
    data: user.favorites
  });
});

// @desc    Get user favorites
// @route   GET /api/users/favorites
// @access  Private
exports.getFavorites = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('favorites');

  res.status(200).json({
    success: true,
    count: user.favorites.length,
    data: user.favorites
  });
});

// @desc    Update user preferences
// @route   PUT /api/users/preferences
// @access  Private
exports.updatePreferences = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  user.preferences = {
    ...user.preferences,
    ...req.body
  };

  await user.save();

  res.status(200).json({
    success: true,
    data: user.preferences
  });
});
