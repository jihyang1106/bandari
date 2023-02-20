const express = require('express');
const roomController = require('../controller/room');
const router = express.Router();

/** 채팅 추가 */
router.post('/insert', roomController.postInsert);

/** 채팅 데이터 가져오기 */
router.get('/getData', roomController.getData);

module.exports = router;
