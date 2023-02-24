import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import styles from '../components/Nav';
const ViewKakao = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('userId');
    localStorage.removeItem('access_token');
    localStorage.removeItem('pet');
    navigate('/');
  }, []);

  return (
    <>
      <Nav />
      <div className={styles.sellForm}>
        <div> 카카오 로그아웃 중</div>
      </div>
    </>
  );
};
export default ViewKakao;
