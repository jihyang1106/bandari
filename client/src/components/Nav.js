import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import styles from './css/Nav.module.css';

import SwitchBtn from './SwitchBtn';

import logo from '../assets/Logo.png';
import DogIcon from '../assets/DogIcon.png';
import CatIcon from '../assets/CatIcon.png';
import BasicIcon from '../assets/BasicIcon.png';

import GetLocation from './js/GetLocation';

const Nav = () => {
  const isLoggedIn = useSelector((state) => state.user.user.isLoggedIn);
  const dispatch = useDispatch();

  const [swtichType, setSwitchType] = useState('');
  const btnState = useSelector((state) => state.typeSwitch.switchState);
  const userLocation = useSelector((state) => state.location.userLocation);
  const haveLocation = useSelector((state) => state.location.haveLocation);

  console.log(userLocation, haveLocation);

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
  const onClickLogin = () => {
    console.log('로그인하는함수');
  };

  /**클릭시 위치얻기 실행되는 함수 */

  console.log(btnState);
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
    </div>
  );
};

export default Nav;
