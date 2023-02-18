const express = require('express');
const supplies = require('../controller/supplies');
const router = express.Router();

// 용품 글 등록
router.post('/insert', supplies.postInsert);

router.get('/getData', supplies.getData);

router.post('/postLikePlus', supplies.postLikePlus);
router.post('/postLikeminus', supplies.postLikeminus);

module.exports = router;
