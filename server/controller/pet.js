const { pet } = require('../model');

// 용품 판매글 조회
exports.getData = async (req, res) => {
  console.log('req.query', req.query.id);
  const result = await pet.findOne({ where: { id: req.query.id }, raw: true });
  console.log(result);
  res.send(result);
};

// 마이페이지 펫 체크
exports.checkPet = async (req, res) => {
  const result = await pet
    .findAll({
      where: { userId: req.body.userID },
      raw: true,
    })
    .then((result) => {
      console.log('값 오나융?ㅠㅠㅠ:', result);
      res.send(result);
    });
};
