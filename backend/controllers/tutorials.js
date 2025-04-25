const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Tutorial = require('../models/Tutorial');

// @desc    Get all tutorials
// @route   GET /api/tutorials
// @access  Public
exports.getTutorials = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single tutorial
// @route   GET /api/tutorials/:id
// @access  Public
exports.getTutorial = asyncHandler(async (req, res, next) => {
  const tutorial = await Tutorial.findById(req.params.id)
    .populate({
      path: 'user',
      select: 'name avatar'
    })
    .populate('relatedModels')
    .populate('comments');

  if (!tutorial) {
    return next(
      new ErrorResponse(`Tutorial not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: tutorial
  });
});

// @desc    Create new tutorial
// @route   POST /api/tutorials
// @access  Private
exports.createTutorial = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Check if user is admin or creator
  if (req.user.role !== 'admin' && req.user.role !== 'creator') {
    return next(
      new ErrorResponse(
        `User with role ${req.user.role} is not authorized to create a tutorial`,
        403
      )
    );
  }

  const tutorial = await Tutorial.create(req.body);

  res.status(201).json({
    success: true,
    data: tutorial
  });
});

// @desc    Update tutorial
// @route   PUT /api/tutorials/:id
// @access  Private
exports.updateTutorial = asyncHandler(async (req, res, next) => {
  let tutorial = await Tutorial.findById(req.params.id);

  if (!tutorial) {
    return next(
      new ErrorResponse(`Tutorial not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is tutorial owner or admin
  if (tutorial.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this tutorial`,
        401
      )
    );
  }

  tutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: tutorial
  });
});

// @desc    Delete tutorial
// @route   DELETE /api/tutorials/:id
// @access  Private
exports.deleteTutorial = asyncHandler(async (req, res, next) => {
  const tutorial = await Tutorial.findById(req.params.id);

  if (!tutorial) {
    return next(
      new ErrorResponse(`Tutorial not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is tutorial owner or admin
  if (tutorial.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this tutorial`,
        401
      )
    );
  }

  await tutorial.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Upload tutorial thumbnail
// @route   POST /api/tutorials/:id/thumbnail
// @access  Private
exports.uploadTutorialThumbnail = asyncHandler(async (req, res, next) => {
  const tutorial = await Tutorial.findById(req.params.id);

  if (!tutorial) {
    return next(
      new ErrorResponse(`Tutorial not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is tutorial owner or admin
  if (tutorial.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this tutorial`,
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
  file.name = `tutorial_${tutorial._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/tutorials/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Tutorial.findByIdAndUpdate(req.params.id, { thumbnail: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Increment view count
// @route   PUT /api/tutorials/:id/view
// @access  Public
exports.incrementViewCount = asyncHandler(async (req, res, next) => {
  const tutorial = await Tutorial.findById(req.params.id);

  if (!tutorial) {
    return next(
      new ErrorResponse(`Tutorial not found with id of ${req.params.id}`, 404)
    );
  }

  tutorial.viewCount += 1;
  await tutorial.save();

  res.status(200).json({
    success: true,
    data: {
      viewCount: tutorial.viewCount
    }
  });
});

// @desc    Get featured tutorials
// @route   GET /api/tutorials/featured
// @access  Public
exports.getFeaturedTutorials = asyncHandler(async (req, res, next) => {
  const tutorials = await Tutorial.find({ featured: true, published: true })
    .populate({
      path: 'user',
      select: 'name avatar'
    });

  res.status(200).json({
    success: true,
    count: tutorials.length,
    data: tutorials
  });
});

// @desc    Get tutorials by category
// @route   GET /api/tutorials/category/:category
// @access  Public
exports.getTutorialsByCategory = asyncHandler(async (req, res, next) => {
  const tutorials = await Tutorial.find({ 
    category: req.params.category,
    published: true
  })
    .populate({
      path: 'user',
      select: 'name avatar'
    });

  res.status(200).json({
    success: true,
    count: tutorials.length,
    data: tutorials
  });
});

// @desc    Get tutorials by difficulty
// @route   GET /api/tutorials/difficulty/:difficulty
// @access  Public
exports.getTutorialsByDifficulty = asyncHandler(async (req, res, next) => {
  const tutorials = await Tutorial.find({ 
    difficulty: req.params.difficulty,
    published: true
  })
    .populate({
      path: 'user',
      select: 'name avatar'
    });

  res.status(200).json({
    success: true,
    count: tutorials.length,
    data: tutorials
  });
});

// @desc    Get tutorials by tag
// @route   GET /api/tutorials/tag/:tag
// @access  Public
exports.getTutorialsByTag = asyncHandler(async (req, res, next) => {
  const tutorials = await Tutorial.find({ 
    tags: req.params.tag,
    published: true
  })
    .populate({
      path: 'user',
      select: 'name avatar'
    });

  res.status(200).json({
    success: true,
    count: tutorials.length,
    data: tutorials
  });
});
