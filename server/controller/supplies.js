const { supplies } = require('../model');
const { img } = require('../model');
const { Op } = require('sequelize');

// 용품 판매글 조회
exports.getData = async (req, res) => {
  const result = await supplies.findAll({
    include: [
       {
         model: img,
         required:false
       }
    ]
    //  where: {'$img.img1$': { [Op.ne]: null }},
});
  // const result = await supplies.findAll();
  // const resultImg = await img.findAll();
  console.log(result)
  res.send(result);
};

// 판매글 좋아요 카운트, 상태
exports.postLikePlus = async (req, res) => {
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

// 판매 페이지 검색
exports.postSearch = async (req, res) => {
  console.log('검색 값 오나유? :', req.body);
  let searchWord = req.body.searchData;
  supplies
    .findAll({
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
