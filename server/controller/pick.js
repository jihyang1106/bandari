const { pick } = require('../model');
const { supplies } = require('../model');
const { Op } = require('sequelize');

// 판매페이지에서 pick 데이터 조회
exports.getLike = async (req, res) => {
  console.log('getLike req.query 뷰값 오나요?', req.query);
  const result = await pick.findAll({ raw: true });
  console.log('pick 조회 :', result);
  res.send(result);
};
