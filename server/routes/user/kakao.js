var express = require('express');
var controller = require('../../controller/user/login');
const router = express.Router();

router.get('/kakao/code', controller.kakaoCode);

router.delete('/logout/kakao', controller.viewKakaoLogout);
router.delete('/kakao/logout', controller.kakaoLogout);
module.exports = router;
