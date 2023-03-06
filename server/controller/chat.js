const { chat } = require('../model');

exports.postInsert = async (req, res) => {
  console.log('채팅 추가하려고 서버에서 넘어온 값', req.body);
  const result = await chat.create(req.body);
  res.send(true);
};

exports.getData = async (req, res) => {
  const result = await chat.findAll({
    where: { roomId: req.query.id },
    attributes: ['id', 'msg', 'time', 'userId', 'roomId'],
    raw: true,
  });
  res.send(result);
};
