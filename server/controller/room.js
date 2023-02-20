const { room } = require('../model');
const { supplies } = require('../model');

exports.postInsert = async (req, res) => {
  // 똑같은 값이 없을 때 room 테이블에 create 있을 때 findOne
  const [result, created] = await room.findOrCreate({
    where: {
      suppliesId: req.body.suppliesId,
      userId: req.body.userId,
      otherId: req.body.otherId,
    },
    raw: true,
  });

  res.send(created);
};

exports.getData = async (req, res) => {
  // console.log('room의 데이터', req.query);

  // 내가 만든 채팅방
  const userId = await room.findAll({
    where: {
      userId: req.query.id,
    },
    raw: true,
    include: [
      {
        model: supplies,
        required: false,
      },
    ],
  });

  // 다른 유저가 만든 채팅방
  const otherId = await room.findAll({
    where: {
      otherId: req.query.id,
    },
    raw: true,
    include: [
      {
        model: supplies,
        required: false,
      },
    ],
  });

  const result = { userId: userId, otherId: otherId };
  console.log(result);
  res.send(result);
};
