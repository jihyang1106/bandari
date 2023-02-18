const express = require('express');
const multer = require('multer');
const moment = require('moment');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { Op } = require('sequelize');
const user = require('../model/user');
try {
  fs.readdirSync('../client/public/uploads');
} catch (err) {
  console.error('upload 폴더가 없습니다. 폴더를 생성합니다.');
  fs.mkdirSync('../client/public/uploads');
}
const imgList = {};
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      console.log(req.file);
      done(null, '../client/public/uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, moment().format('YYYYMMDDHHmmss') + ext); // 저장되는 파일명
    },
  }),
});
/** 업로드 하나만 */
// router.post('/insert', upload.single('img'), async (req, res) => {
//   console.log('req.file', req.file);
//   console.log('req.body', JSON.parse(req.body.data));
//   // const result = await User.create({});
//   // console.log(result);
//   res.send(true);
// });
/** 업로드 여러개 */
(exports.postInsert = upload.array('img')),
  async (req, res) => {
    console.log(req.body);
    console.log(req.files);
  };

// 좋아요 조회
// exports.getLikeCount = async (req, res) => {
//   await
// }
