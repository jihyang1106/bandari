const express = require('express');
const pet = require('../controller/pet');
const router = express.Router();

// 펫 프로필 등록
router.post('/insert', pet.postInsert);

module.exports = router;
