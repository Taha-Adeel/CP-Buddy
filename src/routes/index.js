const express = require('express');
const router = express.Router();
const controller = require('../controller');

// For getting hints for a problem statement
router.post('/hints', controller.getHint);

// For interacting with the chatbot
router.post('/chat', controller.chat);

module.exports = router;