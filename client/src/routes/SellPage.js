import React from 'react';

import styles from './css/SellPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';

const SellPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.sellPage}>
        <section>
          <Category />
          판매페이지
        </section>
      </div>
    </>
  );
};

export default SellPage;
