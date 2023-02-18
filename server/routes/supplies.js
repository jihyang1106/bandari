const express = require('express');
const supplies = require('../controller/supplies');
const router = express.Router();

// 용품 글 등록
router.post('/insert', supplies.postInsert);

module.exports = router;
