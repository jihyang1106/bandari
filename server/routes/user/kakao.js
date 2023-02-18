var express = require('express');
var controller = require('../../controller/login');
const router = express.Router();

router.get('/code', controller.kakaoCode);
router.get('/logout', controller.kakaoLogout);
router.get('/isLogin', controller.isLogin);


module.exports = router;
