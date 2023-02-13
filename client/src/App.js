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
