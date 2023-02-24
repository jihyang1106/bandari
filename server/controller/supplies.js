const { supplies, pick, img, pet, Sequelize } = require('../model');
const Op = Sequelize.Op;

// 용품 판매글 조회 & 메인페이지 인기글 조회
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

  res.send(result);
};

// 판매 페이지 검색
exports.postSearch = async (req, res) => {
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
      // console.log('디비 조회', result);
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

// 메인페이지 인기글 조회
exports.getPopularPost = async (req, res) => {
  pick
    .findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('pick.id')), 'count'],
        'suppliesId',
      ],
      include: [
        {
          model: supplies,
          required: true,
        },
      ],
      group: 'suppliesId',
      raw: true,
    })
    .then((result) => {
      console.log('메인페이지 인기글 조회', result);
      res.send(result);
    });
};

exports.getLikeCount = async (req, res) => {
  supplies
    .findOne({
      where: {
        id: req.query.id,
      },
      attributes: ['likeCount'],
    })
    .then((result) => {
      res.send(result);
    });
};

exports.getImgs = async (req, res) => {
  console.log(req.query);
  img
    .findAll({
      where: { suppliesId: req.query.suppliesId },
    })
    .then((result) => {
      console.log('리절', result);
      res.send(result);
    });
};
