const { supplies, pick, img, pet, Sequelize, user } = require('../model');
const Op = Sequelize.Op;

// 용품 판매글 조회 & 메인페이지 인기글 조회
exports.getData = async (req, res) => {
  let petType = req.query.type;

  // 메인 페이지 에서 렌더 시 및 판매페이지에서 위치 기준으로 렌더시
  if (petType === 'basic' && !req.query.buyer) {
    // 메인페이지에서 렌더 시
    if (req.query.location === 'location') {
      const mypage = await supplies.findAll({
        include: [
          {
            model: img,
            required: false,
          },
          {
            model: pick,
            required: false,
          },
          {
            model: user,
            required: false,
            attributes: ['nickname'],
          },
        ],
        order: [['id', 'DESC']],
      });
      res.send(mypage);
    } else {
      // 판매 페이지에서 위치 기준으로 렌더시
      const basic = await supplies.findAll({
        include: [
          {
            model: img,
            required: false,
          },
          {
            model: pick,
            required: false,
          },
          {
            model: user,
            required: false,
            attributes: ['nickname'],
          },
        ],
        where: {
          location: { [Op.startsWith]: req.query.location.region_2depth_name },
        },
        order: [['id', 'DESC']],
      });
      res.send(basic);
    }
  } else if (petType === 'puppy') {
    petType = '강아지';
    const puppy = await supplies.findAll({
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
        location: { [Op.startsWith]: req.query.location.region_2depth_name },
        petType: petType,
      },
      order: [['id', 'DESC']],
    });
    res.send(puppy);
  } else if (petType === 'cat') {
    petType = '고양이';
    const cat = await supplies.findAll({
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
        location: { [Op.startsWith]: req.query.location.region_2depth_name },
        petType: petType,
      },
      order: [['id', 'DESC']],
    });
    res.send(cat);
  } else if (
    // 로그인 한 유저가 구매한 글 가져오기
    petType === 'basic' &&
    req.query.location === 'location' &&
    req.query.buyer
  ) {
    const buyItem = await supplies.findAll({
      where: {
        deal: req.query.buyer,
      },
      include: [
        {
          model: pick,
          required: false,
        },
      ],
      order: [['id', 'DESC']],
    });
    res.send(buyItem);
  }
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
      order: [['id', 'DESC']],
    })
    .then((result) => {
      res.json(result);
    });
};

// 판매 완료 확인
exports.patchUpdateDeal = async (req, res) => {
  const soldOut = await supplies.findOne({
    where: { id: req.body.id },
    attributes: ['deal'],
    raw: true,
  });

  // null이 아니면 이미 판매 완료된 상품, null이면 판매 완료 성공!
  if (soldOut.deal != null) {
    res.send(soldOut);
  } else {
    const result = await supplies.update(
      { deal: req.body.buyer },
      { where: { id: req.body.id } }
    );
    res.send(result);
  }
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
      res.send(result);
    });
};

exports.patchSupplies = async (req, res) => {
  let data;
  data = {
    title: req.body.data.title,
    price: req.body.data.price,
    content: req.body.data.content,
  };
  await supplies.update(data, {
    where: { id: req.body.data.suppliesId },
  });
  res.send(true);
};

exports.deleteSupplies = async (req, res) => {
  await supplies.destroy({
    where: { id: req.body.suppliesId },
  });
  res.send(true);
};
