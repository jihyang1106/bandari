const { supplies } = require('../model');
const { pick } = require('../model');
const { img } = require('../model');
const { Op } = require('sequelize');

// 용품 판매글 조회
exports.getData = async (req, res) => {
  const result = await supplies.findAll({
    include: [
      {
        model: img,
        required: false,
      },
      {
        model: pick,
        required: false,
      },
    ],
    //  where: {'$img.img1$': { [Op.ne]: null }},
  });
  // const result = await supplies.findAll();
  // const resultImg = await img.findAll();
  // console.log('여기는 서버, 용품 판매글 조회 값 :', result);
  res.send(result);
};

// 판매 페이지 검색
exports.postSearch = async (req, res) => {
  console.log('검색 값 오나유? :', req.body);
  let searchWord = req.body.searchData;
  supplies
    .findAll({
      include: [
        {
          model: img,
          required: false,
        },
        {
          model: pick,
          required: false,
        },
      ],
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: '%' + searchWord + '%',
            },
          },
          {
            content: {
              [Op.like]: '%' + searchWord + '%',
            },
          },
        ],
      },
    })
    .then((result) => {
      console.log('디비 조회', result);
      res.json(result);
    });
};

// 판매 완료 확인
exports.patchUpdateDeal = async (req, res) => {
  console.log(req.body.id);
  const result = await supplies.update(
    { deal: false },
    { where: { id: req.body.id } }
  );
  console.log('result', result);
  res.send(result);
};
