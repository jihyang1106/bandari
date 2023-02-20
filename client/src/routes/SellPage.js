import React, { useState, useEffect } from 'react';
import { Link, useNavigate, withRouter } from 'react-router-dom';

import styles from './css/SellPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import Card from '../components/Card';
import SellCategory from '../components/SellCategory';

import {
  setStateBasic,
  setSatatePeed,
  setStateSnack,
  setStateProduct,
} from '../store/module/sellCategorySwitch';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

const SellPage = () => {
  const btnState = useSelector((state) => state.sellCategorySwitch.switchState);
  const [sell, setSell] = useState([]);
  const [ser, setSer] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
    if (btnState === 'basic') {
      setSell(sell);
    } else if (btnState === 'peed') {
      sell.filter((data) => data.category === 'peed');
      setSell(sell);
    } else if (btnState === 'snack') {
      sell.filter((data) => data.category === 'snack');
      setSell(sell);
    } else if (btnState === 'product') {
      sell.filter((data) => data.category === 'product');
      setSell(sell);
    }
  }, [btnState]);
  // console.log(
  //   'asd',
  //   sell.filter((data) => data.category === 'peed')
  // );

  /*판매글 가져오는 함수* */
  const getData = () => {
    console.log('판매글가져오는함수');
    axios.get('supplies/getData').then((res) => {
      // console.log('판매글 아이디 : ', res.data[0].id);
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
