const { room } = require('../model');
const { supplies } = require('../model');
const { user } = require('../model');

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
  const totalResult = {};
  const userId = await room.findAll({
    where: {
      userId: req.query.id,
    },
    include: [
      {
        model: supplies,
        attributes: ['title', 'price', 'content', 'deal', 'cover', 'userId'],
      },
    ],
    raw: true,
    order: [['id', 'desc']],
  });

  // 다른 유저가 만든 채팅방
  const otherId = await room.findAll({
    where: {
      otherId: req.query.id,
    },
    include: [
      {
        model: supplies,
        attributes: ['title', 'price', 'content', 'deal', 'cover', 'userId'],
      },
    ],
    raw: true,
    order: [['id', 'desc']],
  });

  // 내림차순 정렬
  let result = [];
  // 내가 만든 채팅방, 남이 만든 채팅방 다 있을 때
  if (userId && otherId) {
    userId.forEach((el, i) => {
      result.push(el);
    });
    otherId.forEach((el, i) => {
      result.push(el);
    });
    result.sort((a, b) => {
      return b.id - a.id;
    });
  } else if (userId) {
    // 내가 만든 채팅방만 있을 때
    userId.forEach((el, i) => {
      result.push(el);
    });
  } else if (otherId) {
    // 남이 만든 채팅방만 있을 때
    otherId.forEach((el, i) => {
      result.push(el);
    });
  }

  console.log(result);
  res.send(result);
};
