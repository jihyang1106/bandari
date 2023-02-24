import { createContext, useRef, useState } from 'react';

import AppRouter from './routes/AppRouter';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './store/module/user';
import { setPets } from './store/module/pets';
import GetLocation from './components/js/GetLocation';

function App() {
  const userId = sessionStorage.getItem('userId');

  const [init, setInit] = useState(true);

  const dispatch = useDispatch();

  axios
    .get('kakao/getPetId', {
      params: {
        userId: userId,
      },
    })
    .then((res) => {
      /*백에서 불러온 펫 데이터*/
      console.log('데이터', res.data);
      dispatch(setPets(res.data));
      sessionStorage.setItem('pet', res.data);
    });
  /* 펫 정보 */
  const pets = {
    pets: sessionStorage.getItem('pets'),
  };

  /*펫 정보*/
  if (pets) {
    console.log('pets', pets);
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
