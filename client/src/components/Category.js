import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './css/Category.module.css';

const Category = () => {
  return (
    <div className={styles.category}>
      <div className={styles.link}>
        <NavLink to="/sellPage">
          <span>판매페이지</span>
        </NavLink>
      </div>
      <div className={styles.link}>
        <NavLink to="/chatPage">
          <span>채팅</span>
        </NavLink>
      </div>
      <div className={styles.link}>
        <NavLink to="/myPage">
          <span>마이페이지</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Category;
