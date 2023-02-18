import React, { useEffect } from 'react';
import axios from 'axios';

const delUserData = () => {
  axios({
    method: 'get',
    url: 'http://localhost:5000/delUserData',
  }).then((res) => {
    console.log(res.data.isLogin);
  });
};

export default delUserData;
