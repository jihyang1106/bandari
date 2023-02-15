var express = require('express');
var controller = require('../controller/user/login');
const router = express.Router();

router.get('/getLogin/kakao', controller.viewKakaoLogin);
router.post('/kakao/finish', controller.kakaoLogin);

router.delete('/logout/kakao', controller.viewKakaoLogout);
router.delete('/kakao/logout', controller.kakaoLogout);
module.exports = router;
