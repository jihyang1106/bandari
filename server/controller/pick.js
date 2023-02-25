const { pick } = require('../model');
const { supplies } = require('../model');
const { img } = require('../model');
const { Op } = require('sequelize');

// 판매페이지에서 pick 데이터 조회
exports.getLike = async (req, res) => {
  console.log('getLike req.query 뷰값 오나요?', req.query);
  const result = await pick.findAll({ raw: true });
  console.log('pick 조회 :', result);
  res.send(result);
};

// 판매글 좋아요 카운트, 상태
exports.postLikePlus = async (req, res) => {
  console.log('좋아요 값', req.body.likeCount);
  await pick.create(
    {
      suppliesId: req.body.id,
      userId: req.body.userId,
    },
    { raw: true }
  );
  await supplies
    .update(
      { likeCount: req.body.likeCount + 1 },
      {
        where: {
          id: req.body.id,
        },
        raw: true,
      }
    )
    .then((data) => res.send(true));
};

exports.postLikeminus = async (req, res) => {
  console.log(req.body);
  await pick.destroy({
    where: { userId: req.body.userId, suppliesId: req.body.id },
    raw: true,
  });
  await supplies
    .update(
      { likeCount: req.body.likeCount - 1 },
      {
        where: {
          id: req.body.id,
        },
        raw: true,
      }
    )
    .then((data) => {
      res.send(true);
    });
};

// 카드에서 아이디값 좋아요 정보 조회
exports.getPick = async (req, res) => {
  console.log('로그인값', req.body.userId);
  const result = await pick.findAll({
    where: {
      userId: req.body.userId,
    },
    raw: true,
  });
  res.send(result);
};

exports.userPick = async (req, res) => {
  console.log('쿼리', req.query.userId);
  const result = await pick.findAll({
    where: {
      userId: req.query.userId,
    },
    include: [
      {
        model: supplies,
      },
    ],
  });

  res.send(result);
};
