const { user } = require('../model');
const axios = require('axios');
require('dotenv').config();


const CLIENT_ID = process.env.KAKAO_CLIENTID
const REDIRECT_URI = process.env.KAKAO_REDIRECTURI
const CLIENT_SECRET = process.env.KAKAO_CLIENTSECRET 
  



exports.kakaoCode = async(req, res) => {
  console.log("query",req.query.code)
  console.log(CLIENT_ID)
  console.log(REDIRECT_URI)
  console.log(CLIENT_SECRET)
 token = await axios({
  method:'POST',
  url:'https://kauth.kakao.com/oauth/token',
  Headers:{
    'Content-type':'application/x-www-form-urlencoded;charset=utf-8'
 },
 data:{
  grant_type:'authorization_code',
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  code:req.query.code,
  client_secret: CLIENT_SECRET
 }

  
}) 
.then((res)=>{
  
  console.log(res.data)
  res.redirect('http://localhost:3000')
 })

 
};

exports.kakaoLogin = async (req, res) => {
  await axios({}).then((res) => {});
};

exports.viewKakaoLogout = () => {};

exports.kakaoLogout = () => {};
