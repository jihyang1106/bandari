import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import styles from './css/Nav.module.css';

import SwitchBtn from './SwitchBtn';
import NavCategoryHamburger from './NavCategoryHamburger';

import logo from '../assets/Logo.png';
import DogIcon from '../assets/DogIcon.png';
import CatIcon from '../assets/CatIcon.png';
import BasicIcon from '../assets/BasicIcon.png';

import HamburgerIcon from '../assets/HamburgerIcon.png';

import GetLocation from './js/GetLocation';

const Nav = () => {
  const isLoggedIn = useSelector((state) => state.user.user.isLoggedIn);
  const dispatch = useDispatch();
  const HamburgerDivRef = useRef();

  const [swtichType, setSwitchType] = useState('');
  const btnState = useSelector((state) => state.typeSwitch.switchState);
  const userLocation = useSelector((state) => state.location.userLocation);
  const haveLocation = useSelector((state) => state.location.haveLocation);

  useEffect(() => {
    if (btnState === 'basic') {
      setSwitchType('기본');
    } else if (btnState === 'puppy') {
      setSwitchType('강아지');
    } else {
      setSwitchType('고양이');
    }
  }, [btnState]);

  /**로그인 클릭시 실행되는 함수*/

  const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENTID;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECTURI;
  const onClickLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  /**클릭시 위치얻기 실행되는 함수 */

  /*카테고리 열기 함수*/
  const onClickOpenCategory = () => {
    HamburgerDivRef.current.classList.toggle(`${styles.open}`);
  };

  return (
    <div className={styles.nav}>
      <div>
        <NavLink to="/">
          <img src={logo} alt="logo" className={styles.logoIcon} />
        </NavLink>
        {btnState === 'basic' ? (
          <img src={BasicIcon} alt="basicIcon" className={styles.typeIcon} />
        ) : (
          ''
        )}
        {btnState === 'puppy' ? (
          <img src={DogIcon} alt="dogIcon" className={styles.typeIcon} />
        ) : (
          ''
        )}
        {btnState === 'cat' ? (
          <img src={CatIcon} alt="catIcon" className={styles.typeIcon} />
        ) : (
          ''
        )}
      </div>
      <div className={styles.btns}>
        {haveLocation ? (
          <span className={`${styles[`${btnState}`]}`}>
            {userLocation.region_3depth_name}
          </span>
        ) : (
          <span className={styles.allowLocationSpan}>위치를 허용해주세요</span>
        )}
        <SwitchBtn />

        <button onClick={onClickLogin}>Login</button>
      </div>
      <NavCategoryHamburger categoryType={btnState} />
    </div>
  );
};

export default Nav;
