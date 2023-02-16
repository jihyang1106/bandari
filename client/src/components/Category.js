import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

import styles from './css/Category.module.css';

import CategoryHamburger from './CategoryHamburger';

const Category = () => {
  const swtichType = useSelector((state) => state.typeSwitch.switchState);
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
