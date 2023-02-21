const express = require('express');
const controller = require('../../controller/login');
const router = express.Router();

router.get('/code', controller.kakaoCode);
router.get('/logout', controller.kakaoLogout);
router.get('/isLogin', controller.isLogin);
router.get('/cleanUp', controller.cleanUp);
router.get('/getPetId', controller.getPetId);
module.exports = router;
