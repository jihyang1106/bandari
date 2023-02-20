const { supplies } = require('../model');
const { img } = require('../model');

// 용품 판매글 조회
exports.getData = async (req, res) => {
  const result = await supplies.findAll();
  const resultImg = await img.findAll();
  res.send(result);
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
