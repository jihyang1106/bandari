import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import locationIcon from '../assets/Location.png';
import './css/SellCategory.css';

import {
  setStateBasic,
  setSatatePeed,
  setStateSnack,
  setStateProduct,
} from '../store/module/sellCategorySwitch';

import axios from 'axios';

export default function SellCategory(props) {
  const basicBtnRef = useRef();
  const peedBtnRef = useRef();
  const snackBtnRef = useRef();
  const productBtnRef = useRef();

  const [swtichType, setSwitchType] = useState('');
  // 클라이언트의 서치 상태 값
  const [search, setSearch] = useState('');
  // db에서 가져온 서치 값
  const [searchData, setSearchData] = useState([]);

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

  // 서치 값
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // db에 검색 값 조회
  const onSerch = () => {
    console.log('검색값 :', search);
    axios
      .post('supplies/postSearch', {
        searchData: search,
      })
      .then((res) => {
        console.log('판매 카테고리 검색 결과 값 :', res.data);
        setSearchData(res.data);
        props.setSell([searchData]);
      });
  };
  return (
    <>
      {/* 상단 카테고리, 검색 & 판매 버튼 누르면, 판매 글 폼 열림 */}
      <div>
        <span className="categoryButtonContainer">
          <div className="adressPickButton">
            <img src={locationIcon} alt="주소지 버튼 아이콘" />
            {userLocation ? (
              <>
                {' '}
                {userLocation.region_2depth_name +
                  ' ' +
                  userLocation.region_3depth_name}
              </>
            ) : (
              <>전체</>
            )}
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
              className="categoryButton snackBtn"
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
        <span className="searchNav">
          <input
            type="text"
            className="searchInput"
            value={search}
            onChange={onChangeSearch}
          />
          {/* 서치값 sellpage 컴포넌트로 값을 보내는 중 */}
          <button
            className="searchBtn"
            onClick={() => {
              onSerch();
            }}
          >
            검색
          </button>

          <button
            className="saleButton"
            onClick={() => {
              sellButton();
            }}
          >
            판매하기
          </button>
        </span>
      </div>
    </>
  );
}
