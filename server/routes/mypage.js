const express = require('express');
const mypagecontroller = require('../controller/mypage');
const router = express.Router();

router.patch('/patchUser', mypagecontroller.patchUser);



module.exports = router;
