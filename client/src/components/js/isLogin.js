import React, { useEffect } from 'react';
import axios from 'axios';
import { setUserInfo } from '../../store/module/user'

const isLogin = async (dispatch) => {


  axios({
    method: 'get',
    url: 'http://localhost:5000/kakao/isLogin',
  }).then((res) => {
    sessionStorage.setItem('userData', res.data.isLogin);
    dispatch({type:'SETUSERINFO',payload:res.data.isLogin})
    
  });
};

export default isLogin;
