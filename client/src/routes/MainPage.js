import React from 'react';

import styles from './css/MainPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';

import PuppyMainImg from '../assets/PuppyMainImg.png';

const MainPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.mainPage}>
        <section>
          <Category />
          <div className={styles.mainImg}>
            <img src={PuppyMainImg} alt="puppy" />
          </div>
        </section>
      </div>
    </>
  );
};

export default MainPage;
