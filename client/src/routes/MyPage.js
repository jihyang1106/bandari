import React from 'react';

import styles from './css/MyPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import MyPageMain from '../components/MyPageMain';

const MyPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.myPage}>
        <section>
          <Category />
          <MyPageMain />
        </section>
      </div>
    </>
  );
};

export default MyPage;
