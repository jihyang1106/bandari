import { createContext, useRef, useState } from 'react';

import AppRouter from './routes/AppRouter';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './store/module/user';
import { setPets } from './store/module/pets';
import GetLocation from './components/js/GetLocation';

import CursonIcon from './assets/ClickedLikeButton.png';

function App() {
  const userId = sessionStorage.getItem('userId');
  const [init, setInit] = useState(true);

  const cursorRef = useRef();

  const dispatch = useDispatch();

  /* axios 요청 */
  axios.defaults.baseURL = 'http://localhost:5000';
  // axios.defaults.baseURL = 'http://13.124.185.47:5000';

  useEffect(() => {
    GetLocation(dispatch);
  }, []);

  const onCursorEvent = (e) => {};

  return (
    <>
      {init ? (
        <>
          <div
            className="dogCursor"
            ref={cursorRef}
            onMouseMove={onCursorEvent}
          >
            <img src={CursonIcon} alt="" />
          </div>
          <AppRouter />
        </>
      ) : (
        'Initializing...'
      )}
    </>
  );
}

export default App;
