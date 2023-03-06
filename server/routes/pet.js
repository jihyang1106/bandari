const express = require('express');
const petController = require('../controller/pet');
const router = express.Router();
/**db */
const { pet } = require('../model');
/** 파일 관련 */
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

// upload 할 petImg 폴더 없을 시 생성
try {
  fs.readdirSync('../client/public/petImg');
} catch (err) {
  console.error('upload할 petImg 폴더가 없습니다. 폴더를 생성합니다.');
  fs.mkdirSync('../client/public/petImg');
}

// multer
const petUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // 저장되는 path
      done(null, '../client/public/petImg');
    },
    filename(req, file, done) {
      const datas = JSON.parse(req.body.datas);
      const ext = path.extname(file.originalname);
      done(null, `${datas.userId}_${moment().format('YYYYMMDDHHmmss')}${ext}`); // 저장되는 파일명
    },
  }),
});

//펫 프로필 등록
router.post('/insert', petUpload.single('petImg'), async (req, res) => {
  const datas = JSON.parse(req.body.datas);
  const petImg = req.file.filename;
  datas.petImg = `${petImg}`;
  const result = await pet.create(datas);
  res.send(result);
});

router.get('/getData', petController.getData);

// 마이페이지 펫 정보 조회
router.post('/checkPet', petController.checkPet);

router.get('/getPetType', petController.getPetType);

module.exports = router;
