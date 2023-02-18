const express = require('express');
const pet = require('../controller/pet');
const router = express.Router();
const multer = require('multer');
const moment = require('moment');
const axios = require('axios');
const path = require('path');
const Pet = require('../model/pet');

const petUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      console.log('destination');
      done(null, '../client/public/uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, `petImg${moment().format('YYYYMMDDHHmmss')}${ext}`); // 저장되는 파일명
    },
  }),
});

// 펫 프로필 등록
router.post('/insert', petUpload.single('petImg'), (req, res) => {
  console.log('프론트에서 넘어온 값', JSON.parse(req.body.datas));
  console.log('파일', req.file);
  res.send(true);
});

module.exports = router;
