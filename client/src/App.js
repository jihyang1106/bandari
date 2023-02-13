import { createContext, useState } from 'react';

import AppRouter from './routes/AppRouter';

import axios from 'axios';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from './store/module/user';

function App() {
  const [init, setInit] = useState(true);

  const dispatch = useDispatch();

  /* 유저 정보 */
  const userInfo = {
    userId: sessionStorage.getItem('user_id'),
  };

  if (userInfo.userId) {
    dispatch(setUserInfo(userInfo, true));
  } else {
    dispatch(setUserInfo(userInfo, false));
  }

  /* Api 요청 실행 예제 */
  // const callApi = async () => {
  //   axios.get('/api').then((res) => console.log(res.data.test));
  // };
  // useEffect(() => {
  //   callApi();
  // }, []);

  /* axios 요청 */
  // axios.defaults.baseURL = 'http://localhost:5000';
  // axios.defaults.baseURL = 'http://35.174.208.128:5000';

  /**위치 요청 */
  let options = {
    enableHighAccuracy: true, // 정확한 위치 요청
    timeout: 4000, // 위치 정보를 얻을 때까지 기다릴 시간
    maximumAge: 0, // 캐시된 위치 정보의 유효 시간(밀리초)
  };

  // 알아낸 좌표를 kakaoAPI 요청
  const success = (position) => {
    console.log(position.coords.latitude, position.coords.longitude);
    const y = position.coords.latitude;
    const x = position.coords.longitude;
    axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.documents[0].address.address_name);
        console.log(res.data.documents[0].address);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 알아낸 좌표가 없을 때
  const error = (err) => {
    console.warn(`${err.message}, 로그인 버튼 누르기 전에 허용 해주세요`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <>
      {init ? (
        <>
          <AppRouter />
          test
        </>
      ) : (
        'Initializing...'
      )}
    </>
  );
}

export default App;
