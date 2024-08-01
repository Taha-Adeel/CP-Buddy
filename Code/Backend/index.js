const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/hints', controller.getHint);

module.exports = router;