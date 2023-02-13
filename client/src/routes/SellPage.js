import React from 'react';

import styles from './css/SellPage.module.css';
import stylesCard from '../components/css/sellPage/AvailCards.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import AvailCards from '../components/sellPage/AvailCards';
import CategoryButton from '../components/sellPage/CategoryButton';
import AdressPickButton from '../components/sellPage/AdressPickButton';

const SellPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.sellPage}>
        <section>
          <Category />
          <div className={stylesCard.AvailSaleContainer}>
            <span className={stylesCard.categoryButtonContainer}>
              <AdressPickButton />
              <CategoryButton text={'전체'} />
              <CategoryButton text={'사료'} />
              <CategoryButton text={'간식'} />
              <CategoryButton text={'용품'} />
            </span>
            <span className={stylesCard.shearchNav}>
              <input type="text" className={stylesCard.shearchInput} />
              <CategoryButton text={'검색'} />
              <button className={stylesCard.saleButton}>판매하기</button>
            </span>
            <AvailCards />
          </div>
        </section>
      </div>
    </>
  );
};

export default SellPage;
