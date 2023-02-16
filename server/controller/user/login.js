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
  })
    .then((res) => {
      // 토큰을 받아옴
      const ACESS_TOKEN = res.data.access_token;
      //토큰으로 사용자 정보를 받아오는 함수
      return userResponse(ACESS_TOKEN);
    })
    // 함수를 통해 받아온 유저 정보
    .then((user) => {
      //console.log('유저 정보', user);

      const userData = {
        id: user.kakao_account.email,
        nickname: user.kakao_account.profile.nickname,
      };
      console.log('DB에 들어갈 유저정보', userData);

      res.redirect('http://localhost:3000');
    })
    .then((req, res) => {
      user.findAll({ where: { id: userData.id } });
      if (null) {
        user.create();
      }
    });
};
//토큰으로 사용자 정보를 받아오는 함수
let userResponse = (ACESS_TOKEN) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${ACESS_TOKEN}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).then((user) => {
      resolve(user.data);
    });
  });
};

// exports.kakaoCode = async (req, res) => {
//   // 로그인 후 받은 인가 코드로 토큰을 받기위한 요청을 카카오 서버로 보냄
//   const { session, query } = req;
//   const { code } = query;
//   let getToken;

//   getToken = await axios({
//     method: 'POST',
//     url: 'https://kauth.kakao.com/oauth/token',
//     headers: {
//       'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
//     },
//     data: {
//       grant_type: 'authorization_code',
//       client_id: CLIENT_ID,
//       redirect_uri: REDIRECT_URI,
//       code: req.query.code,
//       client_secret: CLIENT_SECRET,
//     },
//   });

//   const { ACESS_TOKEN } = getToken.data;
//   let userToken;

//   userToken = (ACESS_TOKEN) => {
//     axios({
//       method: 'get',
//       url: 'https://kapi.kakao.com/v2/user/me',
//       headers: {
//         Authorization: `Bearer ${ACESS_TOKEN}`,
//         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
//       },
//     }).then((res) => {
//       console.log(res);
//     });
//   };

//   const userData = {
//     ...getToken.data,
//     ...userToken.data,
//   };
//   const result = linkUser(session, 'kakao', authData);
// };

exports.kakaoLogin = async (req, res) => {
  await axios({}).then((res) => {});
};

exports.viewKakaoLogout = () => {};

exports.kakaoLogout = () => {};
