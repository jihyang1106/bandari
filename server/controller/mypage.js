const { user } = require('../model');
const { pet } = require('../model');

exports.patchUser = async (req, res) => {
  let data;
  data = {
    nickname: req.body.userName,
    phone: req.body.userPhoneNumber,
  };
  const result = await user.update(data, { where: { id: userData.id } });
  console.log(result);
  res.send(result);
};

exports.patchPet = async (req, res) => {
  console.log(req.body.data);
  let data;
  data = {
    name: req.body.data.name,
    gender: req.body.data.gender,
    age: req.body.data.age,
    weight: req.body.data.weight,
    petType: req.body.data.petType,
    info: req.body.data.info,
  };
  const result = await pet.update(data, {
    where: {
      id: req.body.data.petId,
    },
  });
  res.send(true);
};
