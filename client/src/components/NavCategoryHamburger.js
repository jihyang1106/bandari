import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './css/NavCategoryHamburger.module.css';
import HamburgerIcon from '../assets/HamburgerIcon.png';

const NavCategoryHamburger = ({ categoryType }) => {
  const HamburgerDivRef = useRef();
  const isLoggedIn = localStorage.getItem('userId')

  const onClickOpenCategory = () => {
    // console.log(HamburgerDivRef.current.classList);
    HamburgerDivRef.current.classList.toggle(`${styles.open}`);
  };

  /**로그인 클릭시 실행되는 함수 */
  const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENTID;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECTURI;
  const LOGOUT_REDIRECT_URI = process.env.REACT_APP_KAKAO_LOGOUT_REDIRECTURI;
  const onClickLogin = async () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/kakao/login`;
    await (window.location.href = kakaoAuthUrl);
  };

  /**로그아웃 클릭시 실행되는 함수*/
  const onClickLogout = async () => {
    sessionStorage.removeItem('userData');
    const kakaoLogoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=http://localhost:3000/kakao/logout`;
    await (window.location.href = kakaoLogoutUrl);
  };

  return (
    <div className={styles.categoryHamburger}>
      <img
        src={HamburgerIcon}
        alt="HamburgerIcon"
        onClick={onClickOpenCategory}
      />
      <div ref={HamburgerDivRef} className={styles.HamburgerDiv}>
        {!isLoggedIn ? (
          <button onClick={onClickLogin} id={styles.loginBtn}>
            Login
          </button>
        ) : (
          <button onClick={onClickLogout} id={styles.logoutBtn}>
            Logout
          </button>
        )}
        <div className={styles.link}>
          <NavLink
            to="/sellPage"
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles[`${categoryType}`]}` : ''
            }
          >
            <span>판매페이지</span>
          </NavLink>
        </div>
        <div className={styles.link}>
          <NavLink
            to="/chatPage"
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles[`${categoryType}`]}` : ''
            }
          >
            <span>채팅</span>
          </NavLink>
        </div>
        <div className={styles.link}>
          <NavLink
            to="/myPage"
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles[`${categoryType}`]}` : ''
            }
          >
            <span>마이페이지</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavCategoryHamburger;
