const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Model = require('../models/Model');

// @desc    Get all models
// @route   GET /api/models
// @access  Public
exports.getModels = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single model
// @route   GET /api/models/:id
// @access  Public
exports.getModel = asyncHandler(async (req, res, next) => {
  const model = await Model.findById(req.params.id)
    .populate({
      path: 'user',
      select: 'name avatar'
    })
    .populate('comments')
    .populate('ratings');

  if (!model) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: model
  });
});

// @desc    Create new model
// @route   POST /api/models
// @access  Private
exports.createModel = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const model = await Model.create(req.body);

  res.status(201).json({
    success: true,
    data: model
  });
});

// @desc    Update model
// @route   PUT /api/models/:id
// @access  Private
exports.updateModel = asyncHandler(async (req, res, next) => {
  let model = await Model.findById(req.params.id);

  if (!model) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is model owner or admin
  if (model.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this model`,
        401
      )
    );
  }

  model = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: model
  });
});

// @desc    Delete model
// @route   DELETE /api/models/:id
// @access  Private
exports.deleteModel = asyncHandler(async (req, res, next) => {
  const model = await Model.findById(req.params.id);

  if (!model) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is model owner or admin
  if (model.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this model`,
        401
      )
    );
  }

  await model.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Upload model file
// @route   POST /api/models/:id/upload
// @access  Private
exports.uploadModelFile = asyncHandler(async (req, res, next) => {
  const model = await Model.findById(req.params.id);

  if (!model) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is model owner or admin
  if (model.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this model`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Check file type
  const fileExtension = path.parse(file.name).ext.toLowerCase().substring(1);
  const validFormats = ['glb', 'gltf', 'obj', 'fbx', 'stl'];
  
  if (!validFormats.includes(fileExtension)) {
    return next(
      new ErrorResponse(`Please upload a valid 3D model file`, 400)
    );
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload a file less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `model_${model._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/models/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Model.findByIdAndUpdate(req.params.id, { 
      filePath: file.name,
      fileFormat: fileExtension
    });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Upload model thumbnail
// @route   POST /api/models/:id/thumbnail
// @access  Private
exports.uploadModelThumbnail = asyncHandler(async (req, res, next) => {
  const model = await Model.findById(req.params.id);

  if (!model) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is model owner or admin
  if (model.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this model`,
        401
      )
    );
  }

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
  file.name = `thumbnail_${model._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/thumbnails/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Model.findByIdAndUpdate(req.params.id, { thumbnail: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Increment download count
// @route   PUT /api/models/:id/download
// @access  Private
exports.incrementDownloadCount = asyncHandler(async (req, res, next) => {
  const model = await Model.findById(req.params.id);

  if (!model) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.id}`, 404)
    );
  }

  model.downloadCount += 1;
  await model.save();

  res.status(200).json({
    success: true,
    data: {
      downloadCount: model.downloadCount
    }
  });
});

// @desc    Increment view count
// @route   PUT /api/models/:id/view
// @access  Public
exports.incrementViewCount = asyncHandler(async (req, res, next) => {
  const model = await Model.findById(req.params.id);

  if (!model) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.id}`, 404)
    );
  }

  model.viewCount += 1;
  await model.save();

  res.status(200).json({
    success: true,
    data: {
      viewCount: model.viewCount
    }
  });
});

// @desc    Get featured models
// @route   GET /api/models/featured
// @access  Public
exports.getFeaturedModels = asyncHandler(async (req, res, next) => {
  const models = await Model.find({ featured: true })
    .populate({
      path: 'user',
      select: 'name avatar'
    });

  res.status(200).json({
    success: true,
    count: models.length,
    data: models
  });
});

// @desc    Get models by category
// @route   GET /api/models/category/:category
// @access  Public
exports.getModelsByCategory = asyncHandler(async (req, res, next) => {
  const models = await Model.find({ category: req.params.category })
    .populate({
      path: 'user',
      select: 'name avatar'
    });

  res.status(200).json({
    success: true,
    count: models.length,
    data: models
  });
});

// @desc    Get models by tag
// @route   GET /api/models/tag/:tag
// @access  Public
exports.getModelsByTag = asyncHandler(async (req, res, next) => {
  const models = await Model.find({ tags: req.params.tag })
    .populate({
      path: 'user',
      select: 'name avatar'
    });

  res.status(200).json({
    success: true,
    count: models.length,
    data: models
  });
});
