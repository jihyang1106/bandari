const { pet } = require('../model');

// 용품 판매글 조회
exports.getData = async (req, res) => {
  console.log('req.query', req.query.id);
  const result = await pet.findOne({ where: { id: req.query.id }, raw: true });
  console.log(result);
  res.send(result);
};
