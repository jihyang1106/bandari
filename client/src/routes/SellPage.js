import React, { useRef, useState, useEffect } from 'react';

import styles from './css/SellPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import Card from '../components/Card';
import SellCategory from '../components/SellCategory';

// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellPage = () => {
  const [sell, setSell] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  /*판매글 가져오는 함수* */
  const getData = () => {
    console.log('판매글가져오는함수');
    axios.get('supplies/getData').then((res) => {
      // console.log('판매글 데이터 : ', res.data);
      // console.log('판매글 데이터 : ', res.data[0]);
      // console.log('판매글 데이터 : ', res.data.length);
      setSell(res.data);
    });
  };
  return (
    <>
      <Nav />
      <div className={styles.sellPage}>
        <section>
          <Category />
          <div className={styles.AvailSaleContainer}>
            <SellCategory />
            <div className={styles.cardContainer}>
              {sell.map((list, index) => {
                return <Card key={index} list={list} />;
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SellPage;
