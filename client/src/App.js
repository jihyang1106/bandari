import { createContext, useRef, useState } from 'react';

import AppRouter from './routes/AppRouter';
import axios from 'axios';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setUserInfo } from './store/module/user';
import { setPets } from './store/module/pets';
import GetLocation from './components/js/GetLocation';
import isLogin from './components/js/isLogin';
import delUserData from './components/js/delisLogin';
function App() {
  const [init, setInit] = useState(true);

  const dispatch = useDispatch();

  /* 유저 정보 */
  const userInfo = {
    userId: sessionStorage.getItem('user_id'),
  };

  /*유저 위치정보*/
  if (userInfo.userId) {
    dispatch(setUserInfo(userInfo, true));
  } else {
    dispatch(setUserInfo(userInfo, false));
  }

  /* 펫 정보 */
  const pets = {
    pets: sessionStorage.getItem('pets'),
  };

  /*펫 정보*/
  if (pets) {
    for (let i = 0; i < pets.length; i++) {
      setPets(pets[i]);
    }
  }
  /* Api 요청 실행 예제 */
  // const callApi = async () => {
  //   axios.get('/api').then((res) => console.log(res.data.test));
  // };
  // useEffect(() => {
  //   callApi();
  // }, []);

  /* axios 요청 */
  axios.defaults.baseURL = 'http://localhost:5000';
  // axios.defaults.baseURL = 'http://13.124.185.47:5000';

  useEffect(() => {
    GetLocation(dispatch);
    isLogin();
    delUserData();
  }, []);
  return (
    <>
      {init ? (
        <>
          <AppRouter />
        </>
      ) : (
        'Initializing...'
      )}
    </>
  );
}

export default App;
