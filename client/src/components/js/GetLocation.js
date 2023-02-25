import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { setUserLocation } from '../../store/module/location';

const GetLocation = async (dispatch) => {
  // let options = {
  //   enableHighAccuracy: true, // 정확한 위치 요청
  //   timeout: 4000, // 위치 정보를 얻을 때까지 기다릴 시간
  //   maximumAge: 0, // 캐시된 위치 정보의 유효 시간(밀리초)
  // };

  let x = '';
  let y = '';
  await fetch('https://geolocation-db.com/json/')
    .then((res) => res.json())
    .then((res) => {
      x = res.longitude;
      y = res.latitude;
    });

  await axios
    .get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
        },
      }
    )
    .then((res) => {
      dispatch(setUserLocation(res.data.documents[0].address, true));
    })
    .catch((e) => {
      console.warn(`${e.message}, 로그인 버튼 누르기 전에 허용 해주세요`);
      dispatch(setUserLocation(null, false));
    });

  // 알아낸 좌표를 kakaoAPI 요청
  // const success = (position) => {
  //   // console.log(position.coords.latitude, position.coords.longitude);
  //   const y = position.coords.latitude;
  //   const x = position.coords.longitude;
  //   axios
  //     .get(
  //       `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`,
  //       {
  //         headers: {
  //           Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       // console.log(res.data.documents[0].address.address_name);
  //       // console.log(res.data.documents[0].address);
  //       dispatch(setUserLocation(res.data.documents[0].address, true));
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // 알아낸 좌표가 없을 때
  // const error = (err) => {
  //   console.warn(`${err.message}, 로그인 버튼 누르기 전에 허용 해주세요`);
  //   dispatch(setUserLocation(null, false));
  // };

  // navigator.geolocation.getCurrentPosition(success, error, options);
};

export default GetLocation;
