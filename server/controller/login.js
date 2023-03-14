const { user } = require('../model');
const axios = require('axios');
const { pet } = require('../model');
require('dotenv').config();

const CLIENT_ID = process.env.KAKAO_CLIENTID;
const REDIRECT_URI = process.env.KAKAO_REDIRECTURI;
const CLIENT_SECRET = process.env.KAKAO_CLIENTSECRET;

exports.token = async (req, res) => {
  await axios({
    method: 'POST',
    url: 'https://kauth.kakao.com/oauth/token',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data: {
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code: req.body.code,
      client_secret: CLIENT_SECRET,
    },
  }).then((result) => {
    res.send(result.data);
  });
};

exports.getKakaoUser = async (req, res) => {
  // 로그인 후 받은 인가 코드로 토큰을 받기위한 요청을 카카오 서버로 보냄
  // 토큰을 받아옴
  const ACCESS_TOKEN = req.query.access_token;
  await axios({
    method: 'get',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  }).then((response) => {
    userData = {
      id: response.data.kakao_account.email,
      nickname: response.data.kakao_account.profile.nickname,
    };

    user.findOne({ where: { id: userData.id } }).then((result) => {
      if (result == null) {
        user.create(userData);
      }
    });
    res.send(userData.id);
  });
};
//토큰으로 사용자 정보를 받아오는 함수

exports.kakaoLogout = (req, res) => {
  res.send(true);
};

exports.getPetId = async (req, res) => {
  var result = await pet.findAll({
    where: { userId: req.query.userId },
    attributes: ['id', 'name'],
    raw: true,
  });

  res.send(result);
};

exports.userDelete = async (req, res) => {
  const ACCESS_TOKEN = req.body.access_token;
  const userId = req.body.userId;
  axios({
    method: 'POST',
    url: 'https://kapi.kakao.com/v1/user/unlink',
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  }).then(() => {
    user.destroy({ where: { id: userId } });
  });
  res.send(true);
};

exports.getNickName = async (req, res) => {
  try {
    const result = await user.findOne({
      where: { id: req.query.id },
      attributes: ['nickname'],
      raw: true,
    });
    res.send(result);
  } catch {
    res.send('로그인 정보가 없습니다.');
  }
};
