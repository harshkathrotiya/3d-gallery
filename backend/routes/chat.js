const express = require('express');
const { processChat } = require('../controllers/chat');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Public route for chat
router.route('/').post(processChat);

// Protected route for authenticated users (can be used for personalized chats)
router.route('/user').post(protect, processChat);

module.exports = router;
