import React, { useRef, useState, useEffect } from 'react';

import locationIcon from '../assets/Location.png';
import './css/SellCategory.css';

import {
  setStateBasic,
  setSatatePeed,
  setStateSnack,
  setStateProduct,
} from '../store/module/sellCategorySwitch';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SellCategory({ setIsSale }) {
  const basicBtnRef = useRef();
  const peedBtnRef = useRef();
  const snackBtnRef = useRef();
  const productBtnRef = useRef();

  const [swtichType, setSwitchType] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const btnState = useSelector((state) => state.sellCategorySwitch.switchState);
  const userLocation = useSelector((state) => state.location.userLocation);

  const sellButton = () => {
    console.log('sellButton 판매 버튼 눌림');
    navigate('/sellForm', { replace: false });
    // setIsSale(true);
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
        <span className="categoryButtonContainer">
          <div className="adressPickButton">
            <img src={locationIcon} alt="주소지 버튼 아이콘" />
            {userLocation.region_2depth_name +
              ' ' +
              userLocation.region_3depth_name}
          </div>
          <span className="changeBtn">
            <button
              ref={basicBtnRef}
              className="categoryButton basicBtn"
              value="basic"
              onClick={clickedBtn}
            >
              전체
            </button>
            <button
              ref={peedBtnRef}
              className="categoryButton peedBtn"
              value="peed"
              onClick={clickedBtn}
            >
              사료
            </button>
            <button
              ref={snackBtnRef}
              className="categoryButton snakBtn"
              value="snack"
              onClick={clickedBtn}
            >
              간식
            </button>
            <button
              ref={productBtnRef}
              className="categoryButton productBtn"
              value="product"
              onClick={clickedBtn}
            >
              용품
            </button>
          </span>
        </span>
        <span className="shearchNav">
          <input type="text" className="shearchInput" />
          <button className="serchBtn">검색</button>

          <button
            className="saleButton"
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
