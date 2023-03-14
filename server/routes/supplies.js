const express = require('express');
const supplilesController = require('../controller/supplies');
const router = express.Router();
/** db */
const { supplies, img } = require('../model');
/** 파일 관련 */
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

// upload 할 img 폴더 없을 시 생성
try {
  fs.readdirSync('../client/build/uploadImg');
} catch (err) {
  console.error('upload할 upload 폴더가 없습니다. 폴더를 생성합니다.');
  fs.mkdirSync('../client/build/uploadImg');
}

// multer
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // 저장되는 path
      done(null, '../client/build/uploadImg');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const origin = file.originalname.substring(
        0,
        file.originalname.lastIndexOf('.')
      );
      done(null, `${origin}-${moment().format('YYYYMMDDHHmmss')}${ext}`); // 저장되는 파일명
    },
  }),
});

// 용품 글 등록
router.post('/insert', upload.array('img'), async (req, res) => {
  const datas = JSON.parse(req.body.datas);
  const imgData = {};
  req.files.forEach((el, i) => {
    switch (i) {
      case 0:
        datas.cover = el.filename;
        return;
      case 1:
        imgData.img1 = el.filename;
        return;
      case 2:
        imgData.img2 = el.filename;
        return;
      case 3:
        imgData.img3 = el.filename;
        return;
    }
  });
  // 판매용품 글 등록(이미지 한 개만 있을 때)
  const result = await supplies.create(datas);

  // 이미지가 두 개 있을 때 부터
  if (imgData.img1 && result) {
    imgData.suppliesId = result.dataValues.id;
    img.create(imgData);
  }
  res.send(true);
});

// 판매페이지 값 조회 & 메인페이지 인기글 조회
router.get('/getData', supplilesController.getData);

// 검색 값
router.post('/postSearch', supplilesController.postSearch);

// 판매완료 수정(품절)
router.patch('/updateDeal', supplilesController.patchUpdateDeal);

// 메인페이지 인기글 조회
router.get('/getPopularPost', supplilesController.getPopularPost);

router.get('/getLikecount', supplilesController.getLikeCount);

router.get('/getImgs', supplilesController.getImgs);

router.patch('/patchSupplies', supplilesController.patchSupplies);

router.delete('/deleteSupplies', supplilesController.deleteSupplies);

module.exports = router;
