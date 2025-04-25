const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Comment = require('../models/Comment');
const Model = require('../models/Model');

// @desc    Get comments
// @route   GET /api/comments
// @route   GET /api/models/:modelId/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
  if (req.params.modelId) {
    const comments = await Comment.find({ 
      model: req.params.modelId,
      parent: { $exists: false }
    })
      .populate({
        path: 'user',
        select: 'name avatar'
      })
      .populate({
        path: 'replies',
        populate: {
          path: 'user',
          select: 'name avatar'
        }
      });

    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single comment
// @route   GET /api/comments/:id
// @access  Public
exports.getComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
    .populate({
      path: 'user',
      select: 'name avatar'
    })
    .populate({
      path: 'replies',
      populate: {
        path: 'user',
        select: 'name avatar'
      }
    });

  if (!comment) {
    return next(
      new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: comment
  });
});

// @desc    Add comment
// @route   POST /api/models/:modelId/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.model = req.params.modelId;

  const model = await Model.findById(req.params.modelId);

  if (!model) {
    return next(
      new ErrorResponse(`No model with the id of ${req.params.modelId}`, 404)
    );
  }

  const comment = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    data: comment
  });
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure comment belongs to user or user is admin
  if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to update comment`, 401));
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  comment = await Comment.findById(comment._id)
    .populate({
      path: 'user',
      select: 'name avatar'
    });

  res.status(200).json({
    success: true,
    data: comment
  });
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure comment belongs to user or user is admin
  if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to delete comment`, 401));
  }

  // Also delete all replies
  await Comment.deleteMany({ parent: comment._id });

  await comment.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Like a comment
// @route   POST /api/comments/:id/like
// @access  Private
exports.likeComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Check if the comment has already been liked by this user
  if (comment.likes.includes(req.user.id)) {
    return next(
      new ErrorResponse(`You have already liked this comment`, 400)
    );
  }

  comment.likes.push(req.user.id);
  await comment.save();

  res.status(200).json({
    success: true,
    data: comment
  });
});

// @desc    Unlike a comment
// @route   DELETE /api/comments/:id/like
// @access  Private
exports.unlikeComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Check if the comment has been liked by this user
  if (!comment.likes.includes(req.user.id)) {
    return next(
      new ErrorResponse(`You have not liked this comment`, 400)
    );
  }

  // Remove the user from likes array
  comment.likes = comment.likes.filter(
    like => like.toString() !== req.user.id
  );
  
  await comment.save();

  res.status(200).json({
    success: true,
    data: comment
  });
});

// @desc    Add reply to comment
// @route   POST /api/comments/:id/reply
// @access  Private
exports.addReply = asyncHandler(async (req, res, next) => {
  const parentComment = await Comment.findById(req.params.id);

  if (!parentComment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Create reply
  const reply = await Comment.create({
    text: req.body.text,
    user: req.user.id,
    model: parentComment.model,
    parent: parentComment._id
  });

  // Populate user info
  const populatedReply = await Comment.findById(reply._id)
    .populate({
      path: 'user',
      select: 'name avatar'
    });

  res.status(201).json({
    success: true,
    data: populatedReply
  });
});
