import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './css/CategoryHamburger.module.css';
import HamburgerIcon from '../assets/HamburgerIcon.png';

const NavCategoryHamburger = ({ categoryType }) => {
  const isLoggedIn = sessionStorage.getItem('userId');
  const HamburgerDivRef = useRef();

  const onClickOpenCategory = () => {
    HamburgerDivRef.current.classList.toggle(`${styles.open}`);
  };

  return (
    <div className={styles.categoryHamburger}>
      <img
        src={HamburgerIcon}
        alt="HamburgerIcon"
        onClick={onClickOpenCategory}
      />
      <div ref={HamburgerDivRef} className={styles.HamburgerDiv}>
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
          {isLoggedIn ? (
            <NavLink
              to="/chatPage"
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles[`${categoryType}`]}` : ''
              }
            >
              <span>채팅</span>
            </NavLink>
          ) : (
            <NavLink
              to="/"
              onClick={() => {
                alert('로그인 하셔야 이용이 가능합니다.');
              }}
            >
              <span>채팅</span>
            </NavLink>
          )}
        </div>
        <div className={styles.link}>
          {isLoggedIn ? (
            <NavLink
              to="/myPage"
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles[`${categoryType}`]}` : ''
              }
            >
              <span>마이페이지</span>
            </NavLink>
          ) : (
            <NavLink
              to="/"
              onClick={() => {
                alert('로그인 하셔야 이용이 가능합니다.');
              }}
            >
              <span>마이페이지</span>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavCategoryHamburger;
