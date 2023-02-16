import React, { useRef, useState, useEffect } from 'react';
// import CategoryButton from './CategoryButton.js';
import AdressPickButton from './AdressPickButton.js';
import styles from './css/SellCategory.module.css';

import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

import {
  setStateBasic,
  setSatatePeed,
  setStateSnack,
  setStateProduct,
} from '../store/module/sellCategorySwitch';
import { useDispatch, useSelector } from 'react-redux';

export default function SellCategory({ setIsSale }) {
  const basicBtnRef = useRef();
  const peedBtnRef = useRef();
  const snackBtnRef = useRef();
  const productBtnRef = useRef();
  const [swtichType, setSwitchType] = useState('');

  const dispatch = useDispatch();
  const btnState = useSelector((state) => state.sellCategorySwitch.switchState);

  const sellButton = () => {
    console.log('sellButton 판매 버튼 눌림');
    setIsSale(true);
  };

  useEffect(() => {
    if (btnState === 'basic') {
      setSwitchType('전체');
      basicBtnRef.current.classList.add('clicked');
    } else if (btnState === 'peed') {
      setSwitchType('사료');
      peedBtnRef.current.classList.add('clicked');
    } else if (btnState === 'snack') {
      setSwitchType('간식');
      snackBtnRef.current.classList.add('clicked');
    } else {
      setSwitchType('용품');
      productBtnRef.current.classList.add('clicked');
    }
  }, [btnState]);

  const clickedBtn = (e) => {
    const target = e.target;
    if (target.value === 'basic') {
      dispatch(setStateBasic());
      peedBtnRef.current.classList.remove('clicked');
      snackBtnRef.current.classList.remove('clicked');
      productBtnRef.current.classList.remove('clicked');
    } else if (target.value === 'peed') {
      dispatch(setSatatePeed());
      basicBtnRef.current.classList.remove('clicked');
      snackBtnRef.current.classList.remove('clicked');
      productBtnRef.current.classList.remove('clicked');
    } else if (target.value === 'snack') {
      dispatch(setStateSnack());
      basicBtnRef.current.classList.remove('clicked');
      peedBtnRef.current.classList.remove('clicked');
      productBtnRef.current.classList.remove('clicked');
    } else if (target.value === 'product') {
      dispatch(setStateProduct());
      basicBtnRef.current.classList.remove('clicked');
      peedBtnRef.current.classList.remove('clicked');
      snackBtnRef.current.classList.remove('clicked');
    }
  };

  // const navigate = useNavigate();
  // const goToFost = () => {
  //   navigate('/', {
  //     state: {
  //       // suppliesID: 글 번호
  //     },
  //   });
  // };

  return (
    <>
      {/* 상단 카테고리, 검색 & 판매 버튼 누르면, 판매 글 폼 열림 */}
      <>
        <span
          className={`${styles.categoryButtonContainer} ${styles.switchBtn}`}
        >
          <AdressPickButton />
          <button
            ref={basicBtnRef}
            className={`${styles.categoryButton} ${styles.basicBtn}`}
            value="basic"
            onClick={clickedBtn}
          >
            전체
          </button>
          <button
            ref={peedBtnRef}
            className={`${styles.categoryButton} ${styles.peedBtn}`}
            value="peed"
            onClick={clickedBtn}
          >
            사료
          </button>
          <button
            ref={snackBtnRef}
            className={`${styles.categoryButton} ${styles.snakBtn}`}
            value="snack"
            onClick={clickedBtn}
          >
            간식
          </button>
          <button
            ref={productBtnRef}
            className={`${styles.categoryButton} ${styles.productBtn}`}
            value="product"
            onClick={clickedBtn}
          >
            용품
          </button>
        </span>
        <span className={styles.shearchNav}>
          <input type="text" className={styles.shearchInput} />
          <button className={`${styles.categoryButton} ${styles.serchBtn}`}>
            검색
          </button>

          <button
            className={styles.saleButton}
            onClick={() => {
              sellButton();
            }}
          >
            판매하기
          </button>
        </span>
      </>
    </>
  );
}
