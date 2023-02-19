import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './css/NavCategoryHamburger.module.css';
import HamburgerIcon from '../assets/HamburgerIcon.png';

const NavCategoryHamburger = ({ categoryType }) => {
  const HamburgerDivRef = useRef();

  const onClickOpenCategory = () => {
    // console.log(HamburgerDivRef.current.classList);
    HamburgerDivRef.current.classList.toggle(`${styles.open}`);
  };

  /**로그인 클릭시 실행되는 함수 */
  const onClickLogin = () => {
    console.log('로그인클릭시');
  };

  return (
    <div className={styles.categoryHamburger}>
      <img
        src={HamburgerIcon}
        alt="HamburgerIcon"
        onClick={onClickOpenCategory}
      />
      <div ref={HamburgerDivRef} className={styles.HamburgerDiv}>
        <button onClick={onClickLogin} id={styles.loginBtn}>
          Login
        </button>
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
            to="/donatePage"
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles[`${categoryType}`]}` : ''
            }
          >
            <span>기부관련페이지</span>
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
