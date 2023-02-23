const express = require('express');
const chatController = require('../controller/chat');
const router = express.Router();

/**채팅 db에 넣기 */
router.post('/insert', chatController.postInsert);

/**채팅 데이터 불러오기 */
router.get('/getData', chatController.getData);

module.exports = router;
