const express = require('express');
const pickController = require('../controller/pick');
const router = express.Router();

// 판매페이지에서 pick 조회
router.get('/getLike', pickController.getLike);

// 좋아요 버튼 +, -
router.post('/postLikePlus', pickController.postLikePlus);
router.post('/postLikeminus', pickController.postLikeminus);

// 카드에서 유저 아이디값으로 좋아요 데이터
router.post('/getPick', pickController.getPick);

module.exports = router;
