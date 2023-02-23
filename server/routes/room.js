const express = require('express');
const roomController = require('../controller/room');
const router = express.Router();

/** 채팅 추가 */
router.post('/insert', roomController.postInsert);

/** 채팅 목록 데이터 가져오기 */
router.get('/getData', roomController.getData);

/** 채팅 삭제 */
router.delete('/delete', roomController.delete);

module.exports = router;
