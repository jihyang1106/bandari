import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import styles from './css/Category.module.css';

import CategoryHamburger from './CategoryHamburger';

const Category = () => {
  const isLoggedIn = sessionStorage.getItem('userId');
  const swtichType = useSelector((state) => state.typeSwitch.switchState);

  const navigate = useNavigate();
  const [categoryType, setCategoryType] = useState('');

  useEffect(() => {
    if (swtichType === 'basic') {
      setCategoryType('basic');
    } else if (swtichType === 'puppy') {
      setCategoryType('puppy');
    } else {
      setCategoryType('cat');
    }
  }, [swtichType]);

  // 로그인 체크 함수 ( 채팅 / 마이페이지 )
  // const loginCheck = () => {
  //   if (!isLoggedIn) {
  //     alert('기능을 사용하시려면, 로그인 부탁드립니다');
  //     navigate('/');
  //     return;
  //   }
  // };
  return (
    <div className={styles.category}>
      <CategoryHamburger categoryType={categoryType} />
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

export default Category;
