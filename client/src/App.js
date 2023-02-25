import { createContext, useRef, useState } from 'react';

import AppRouter from './routes/AppRouter';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './store/module/user';
import { setPets } from './store/module/pets';
import GetLocation from './components/js/GetLocation';
import useMousePosition from './Mousepostion';
import usePrefersReducedMotion from './usePrefersReducedMotion';

import CursonIcon from './assets/ClickedLikeButton.png';

import styles from './App.module.css';
import GlobalStyle from './components/GlobalStyle';

function App() {
  const userId = sessionStorage.getItem('userId');
  const [init, setInit] = useState(true);

  // const mousePosition = useMousePosition();
  // const prefersReducedMotion = usePrefersReducedMotion();

  // const transform = prefersReducedMotion
  //   ? null
  //   : `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
  // const cursorRef = useRef();

  const dispatch = useDispatch();

  /* axios 요청 */
  // axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.baseURL = 'http://13.124.185.47:5000';

  useEffect(() => {
    GetLocation(dispatch);

    // return () => {
    //   window.removeEventListener('mousemove', handleMouseMove);
    // };
  }, []);

  return (
    <>
      {init ? (
        <>
          {/* <img
            ref={cursorRef}
            style={{ transform }}
            src={CursonIcon}
            alt=""
            className={styles.dogCursor}
          /> */}
          <GlobalStyle />
          <AppRouter />
        </>
      ) : (
        'Initializing...'
      )}
    </>
  );
}

export default App;
