const express = require('express');
const {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
  addReply
} = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router.route('/').get(getComments).post(protect, addComment);
router.route('/:id').get(getComment).put(protect, updateComment).delete(protect, deleteComment);
router.route('/:id/like').post(protect, likeComment).delete(protect, unlikeComment);
router.route('/:id/reply').post(protect, addReply);

module.exports = router;
