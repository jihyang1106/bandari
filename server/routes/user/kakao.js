var express = require('express');
var controller = require('../../controller/login');
const router = express.Router();

router.get('/kakao/code', controller.kakaoCode);
router.get('/kakao/logout', controller.kakaoLogout);
// router.get('http://localhost:3000', controller.isLogin)

module.exports = router;
