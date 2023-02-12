import React from 'react';

import styles from './css/MyPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';

const MyPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.myPage}>
        <section>
          <Category />
          마이페이지
        </section>
      </div>
    </>
  );
};

export default MyPage;
