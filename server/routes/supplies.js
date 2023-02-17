let express = require('express');
let controller = require('../controller/supplies');
const router = express.Router();

router.post('/insert', controller.postInsert);

module.exports = router;
