import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

import styles from './css/Category.module.css';

import HamburgerIcon from '../assets/HamburgerIcon.png';

const Category = () => {
  const swtichType = useSelector((state) => state.typeSwitch.switchState);
  const [categoryType, setCategoryType] = useState('');
  const HamburgerDivRef = useRef();

  useEffect(() => {
    if (swtichType === 'basic') {
      setCategoryType('basic');
    } else if (swtichType === 'puppy') {
      setCategoryType('puppy');
    } else {
      setCategoryType('cat');
    }
  }, [swtichType]);

  const onClickOpenCategory = () => {
    console.log(HamburgerDivRef.current.classList);
    HamburgerDivRef.current.classList.toggle(`${styles.open}`);
  };

  return (
    <div className={styles.category}>
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
      <div className={styles.categoryOpened}>
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

export default Category;
