const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      console.log('destination');
      done(null, '../client/public/uploads');
    },
  }),
  filename(req, file, done) {
    done(null, moment().format('YYYYMMDDHHmmss') + '_' + file.originalname); // 저장되는 파일명
  },
});

router.post('/upload', upload.array('img'), (req, res) => {
  console.log(req.file);
  res.send(true);
});

module.exports = router;
