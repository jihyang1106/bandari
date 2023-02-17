const { user } = require('../model');
const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.KAKAO_CLIENTID;
const REDIRECT_URI = process.env.KAKAO_REDIRECTURI;
const CLIENT_SECRET = process.env.KAKAO_CLIENTSECRET;

// exports.kakaoLogin = async (req,res) =>{
//   const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=http://localhost:5000/kakao/code`;
//   res.redirect(kakaoAuthUrl)
// }

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
       ACESS_TOKEN = res.data.access_token;
      //토큰으로 사용자 정보를 받아오는 함수
      return userResponse(ACESS_TOKEN);
    })
    // 함수를 통해 받아온 유저 정보
    .then((res) => {
      //console.log('유저 정보', user);

      userData = {
        id: res.kakao_account.email,
        nickname: res.kakao_account.profile.nickname,
      };
      console.log('DB에 들어갈 유저정보', userData);
       user.findOne({ where: { id: userData.id } })
      .then((result)=>{
        if(result){
          req.session.user = userData 
          console.log("세션1",req.session.user)         
      }
      else {
        user.create(userData);
        req.session.user = userData
        console.log("세션2",req.session.user)        
      }
  })
    })
    res.redirect('http://localhost:3000')
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

exports.kakaoLogout = (req,res) =>{
  console.log("유저세션:",req.session.user)
  req.session.destroy( (err) =>{
    if(err) throw err;
     res.redirect("http://localhost:3000/")
  }
    
  )
}

// exports.isLogin = (req,res) =>{
//   if(req.session.user) {
//     res.send({isLogin:req.session.user.id})
//   }else{
//     res.send({isLoginfalse})
//   }
// }

