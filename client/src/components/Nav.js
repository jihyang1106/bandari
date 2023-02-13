import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './css/Nav.module.css';

import SwitchBtn from './SwitchBtn';

import logo from '../assets/Logo.png';
import DogIcon from '../assets/DogIcon.png';
import CatIcon from '../assets/CatIcon.png';
import BasicIcon from '../assets/BasicIcon.png';

import { useSelector } from 'react-redux';

const Nav = () => {
  const isLoggedIn = useSelector((state) => state.user.user.isLoggedIn);
  // const puppyBtnRef = useRef();
  // const catBtnRef = useRef();
  // const basicBtnRef = useRef();

  const [swtichType, setSwitchType] = useState('');
  const btnState = useSelector((state) => state.typeSwitch.switchState);

  useEffect(() => {
    if (btnState === 'basic') {
      setSwitchType('기본');
    } else if (btnState === 'puppy') {
      setSwitchType('강아지');
    } else {
      setSwitchType('고양이');
    }
  }, [btnState]);

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
        <SwitchBtn />

        <button>Login</button>
      </div>
    </div>
  );
};

export default Nav;
