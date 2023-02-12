import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './css/Nav.module.css';

import logo from '../assets/Logo.png';

const Nav = () => {
  const isLoggedIn = useState(false); //로그인 유무 변수

  return (
    <div className={styles.nav}>
      <div>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className={styles.btns}>
        <button>강아지</button>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Nav;
