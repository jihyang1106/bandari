import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import styles from '../components/Nav';
const ViewKakao = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
    const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENTID;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECTURI;
    const CLIENT_SECRET = process.env.REACT_APP_KAKAO_CLIENTSECRETE;
    axios({
      method: 'post',
      url: '/kakao/token',
      data: {
        code: code,
      },
    })
      .then((res) => {
        console.log(res.data.access_token);
        if (res.data.access_token) {
          localStorage.setItem('access_token', res.data.access_token);
        } else {
          navigate('/');
        }
      })
      .then(() => {
        axios
          .get('/kakao/getKakaoUser', {
            params: {
              access_token: localStorage.getItem('access_token'),
            },
          })
          .then((response) => {
            console.log(response.data);
            sessionStorage.setItem('userId', response.data);
            dispatch({ type: 'SETUSERINFO', isLogin: response.data });
            navigate('/');
          });
      });
  }, []);

  return (
    <>
      <div className={styles.sellForm}>
        <div> 카카오 로그인중</div>
      </div>
    </>
  );
};
export default ViewKakao;
