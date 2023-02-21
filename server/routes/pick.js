const express = require('express');
const pickController = require('../controller/pick');
const router = express.Router();

// 판매페이지에서 pick 조회
router.get('/getLike', pickController.getLike);

module.exports = router;
