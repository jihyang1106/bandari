import React, { useState, useEffect, useRef } from 'react';
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
  // 검색창 값
  const [ser, setSer] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (btnState === 'peed') {
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

  // console.log('sell 리스트 :', sell)
  /*판매글 가져오는 함수* */
  const getData = () => {
    axios.get('supplies/getData').then((res) => {
      // console.log('판매글 아이디 : ', res.data[0].id);
      console.log('res.data', res.data);
      setSell(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log('검색값 판매페이지에 들어오나요 ser :', ser);
  // const searched = sell.filter((item) =>
  //   item.id.toUpperCase().includes(ser.toUpperCase())
  // );
  // console.log('필터 되니?', searched);
  // console.log(sell.filter((item) => {}));

  return (
    <>
      <Nav />
      <div className={styles.sellPage}>
        <section>
          <Category />
          <div className={styles.AvailSaleContainer}>
            <SellCategory setSer={setSer} />
            {/* SellCategory 검색 값*/}
            <input value={ser} />
            <div className={styles.cardContainer}>
              {sell.map((list, index) => {
                return <Card key={index} list={list} />;
              })}
              {/* {ser.length === '' && } */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SellPage;
