import { createContext, useRef, useState } from 'react';

import AppRouter from './routes/AppRouter';
import axios from 'axios';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setUserInfo } from './store/module/user';
import { setPets } from './store/module/pets';
import GetLocation from './components/js/GetLocation';


function App() {
  const [init, setInit] = useState(true);

  const dispatch = useDispatch();

  /* 유저 정보 */
  const userInfo = {
    userId: sessionStorage.getItem('user_id'),
  };

  /*로그인 여부 확인 함수*/
  const isLogin = () => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/kakao/isLogin',
    }).then((res) => {
      //로그인 여부 세션스토리지 저장
      sessionStorage.setItem('userData', res.data.isLogin);
      //로그인 여부 리덕스 저장 로그인 했을때isLogin:id, userName:이름 로그아웃 했을때 false
      dispatch({type:'SETUSERINFO',isLogin:res.data.isLogin, userName:res.data.userName})
      
    });
  };

  /*브라우저 종료시 로그아웃 상태로 만드는 함수*/
  const cleanUp = () =>{
    axios({
      method:'get',
      url:'/kakao/cleanUp'
    })
    // sessionStorage.setItem('userData', false);
    // dispatch({type:'SETUSERINFO',payload:{isLogin:false, userName:false}})
  }
  window.addEventListener('unload', ()=>{
    cleanUp()
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
