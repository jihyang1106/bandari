let express = require('express');
let controller = require('../controller/supplies');
const router = express.Router();

router.post('/insert', controller.postInsert);

// router.get('/getLikeCount', controller.getLikeCount);

module.exports = router;
