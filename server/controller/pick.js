const { pick } = require('../model');
const { supplies, user } = require('../model');
const { img } = require('../model');
const { Op } = require('sequelize');

// 판매페이지에서 pick 데이터 조회
exports.getLike = async (req, res) => {
  const result = await pick.findAll({ raw: true });
  res.send(result);
};

// 판매글 좋아요 카운트, 상태
exports.postLikePlus = async (req, res) => {
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
  const result = await pick.findAll({
    where: {
      userId: req.body.userId,
    },
    raw: true,
  });
  res.send(result);
};

exports.userPick = async (req, res) => {
  const result = await pick.findAll({
    where: {
      userId: req.query.userId,
    },
    include: [
      {
        model: supplies,
      },
      {
        model: user,
        attributes: ['nickname'],
      },
    ],
  });

  res.send(result);
};
