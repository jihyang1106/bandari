const { user } = require('../../model');
const axios = require('axios');

const kakao = {
  clientID: process.env.kakaoClientID,
  redirectUri: process.env.kakaoRedirectUri,
  clientSecret: process.env.kakaoClientSecret,
};

exports.viewKakaoLogin = (req, res) => {
  `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}`;
  console.log(kakao.clientID);
  console.log(kakao.redirectUri);
};

exports.kakaoLogin = async (req, res) => {
  await axios({}).then((res) => {});
};

exports.viewKakaoLogout = () => {};

exports.kakaoLogout = () => {};
