// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const multer = require('multer');
// const moment = require('moment');
// const axios = require('axios');

// const petUpload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       console.log('destination');
//       done(null, '../client/public/uploads');
//     },
//     filename(req, file, done) {
//       const ext = path.extname(file.originalname);
//       done(null, moment().format('YYYYMMDDHHmmss') + ext); // 저장되는 파일명
//     },
//   }),
// });

// exports.postInsert = async (req, res) => {
//   petUpload.single('petImg');
//   console.log('프론트에서 넘어온 값', req.body);
//   console.log(req.file);
//   res.send(true);
// };

// exports.postInsert = async (req, res) => {
//   petUpload.single('petImg');
//   console.log('프론트에서 넘어온 값', req.body);
//   console.log(req.file);
//   res.send(true);
// };
