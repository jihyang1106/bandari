import React, { useEffect } from 'react';
import axios from 'axios';

const isLogin = async () => {
  axios({
    method: 'get',
    url: 'http://localhost:5000/isLogin',
  }).then((res) => {
    console.log(res.data.isLogin);
    sessionStorage.setItem('userdata', res.data.isLogin);
  });
};

export default isLogin;
