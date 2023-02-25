const express = require('express');
const mypagecontroller = require('../controller/mypage');
const router = express.Router();

router.patch('/patchUser', mypagecontroller.patchUser);

router.patch('/patchPet', mypagecontroller.patchPet);

module.exports = router;
