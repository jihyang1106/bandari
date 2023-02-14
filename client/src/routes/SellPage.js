import React from 'react';

import styles from './css/SellPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import SellPageMain from '../components/sellPage/SellPageMain';

const SellPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.sellPage}>
        <section>
          <Category />
          <SellPageMain />
        </section>
      </div>
    </>
  );
};

export default SellPage;
