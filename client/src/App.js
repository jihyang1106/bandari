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
  const [init, setInit] = useState(true);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.user.isLogin);
  /* 유저 정보 */
  const userInfo = {
    userId: sessionStorage.getItem('userData'),
  };

  /*로그인 여부 확인 함수*/
  const isLogin = () => {
    axios({
      method: 'get',
      url: '/kakao/isLogin',
    })
      .then((res) => {
        //로그인 여부 세션스토리지 저장
        sessionStorage.setItem('userData', res.data.isLogin);
        //로그인 여부 리덕스 저장 로그인 했을때isLogin:id, userName:이름 로그아웃 했을때 false
        dispatch({ type: 'SETUSERINFO', isLogin: res.data.isLogin });
      })
      .then(() => {
        axios.get('kakao/getPetId').then((res) => {
          /*백에서 불러온 펫 데이터*/
          console.log('데이터', res.data);
          let petId;
          petId = res.data;

          for (let i = 0; i < petId.length; i++) {
            const newPetId = petId[i].id;
            /*펫 데아터 리덕스 저장을 위한 처리*/
            console.log(newPetId);
            /*newPetID로 데이터가 여러개여도 redux에 들어가게 for문안에 처리하시면 될 것같습니다. */
          }
        });
      });
  };

  /*브라우저 종료시 로그아웃 상태로 만드는 함수*/
  const cleanUp = () => {
    axios({
      method: 'get',
      url: '/kakao/cleanUp',
    });
    // sessionStorage.setItem('userData', false);
    // dispatch({type:'SETUSERINFO',payload:{isLogin:false, userName:false}})
  };
  window.addEventListener('beforeunload', () => {
    cleanUp();
  });

  /*유저 위치정보*/
  // if (userInfo.userId) {
  //   dispatch(setUserInfo(userInfo, true));
  // } else {
  //   dispatch(setUserInfo(userInfo, false));
  // }

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
    isLogin();
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
