const { user } = require('../../model/user');
const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.KAKAO_CLIENTID;
const REDIRECT_URI = process.env.KAKAO_REDIRECTURI;
const CLIENT_SECRET = process.env.KAKAO_CLIENTSECRET;

exports.kakaoCode = async (req, res) => {
  // 로그인 후 받은 인가 코드로 토큰을 받기위한 요청을 카카오 서버로 보냄
  token = await axios({
    method: 'POST',
    url: 'https://kauth.kakao.com/oauth/token',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data: {
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code: req.query.code,
      client_secret: CLIENT_SECRET,
    },
  }).then((res) => {
    // 토큰을 받아옴
    // const ACESS_TOKEN = res.data.access_token
    // const APP_ADMIN_KEY =
    // console.log(res.data);
    // await axios.get({
    //   method:'get',
    //   url:'http://kapi.kakao.com/v2/user/me',
    //   headers:{
    //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   },
    //   data:{
    //     `Bearer ${ACCESS_TOKEN}/KakaoAK ${APP_ADMIN_KEY}`
    //   }
    // })
  });
};

exports.kakaoLogin = async (req, res) => {
  await axios({}).then((res) => {});
};

exports.viewKakaoLogout = () => {};

exports.kakaoLogout = () => {};
