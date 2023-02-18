const express = require('express');
const multer = require('multer');
const moment = require('moment');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { Op } = require('sequelize');
const user = require('../model/user');

const { supplies } = require('../model');

// 용품 판매글 조회
exports.getData = async (req, res) => {
  supplies.findAll({}).then((result) => {
    console.log('디비 받아지나?', result);
    res.send(result);
  });
};

// 판매글 좋아요 카운트, 상태
exports.postLikePlus = async (req, res) => {
  console.log('들어오남요?:', req.body);
  supplies
    .update(
      {
        likeCount: req.body.likeCount,
        deal: true,
      },
      {
        where: { id: req.body.id },
      }
    )
    .then(console.log('좋아요 상태 업데이트 되었습니다.'));
};

exports.postLikeminus = async (req, res) => {
  console.log('들어오남요?:', req.body);
  supplies
    .update(
      {
        likeCount: req.body.likeCount,
        deal: false,
      },
      {
        where: { id: req.body.id },
      }
    )
    .then(console.log('좋아요 상태 업데이트 되었습니다.'));
};
