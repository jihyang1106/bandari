const express = require('express');
const chatController = require('../controller/chat');
const router = express.Router();

router.post('/insert', chatController.postInsert);

module.exports = router;
