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
  const sellState = useSelector(
    (state) => state.sellCategorySwitch.switchState
  );
  const [all, setAll] = useState([]); // 전체 목록을 항상 가지고 있는 state -> 처음에 세팅되면 바뀔 일이 없어요
  const [sell, setSell] = useState([]); // 화면에 보여지는 state ( 전체, 사료 이런 거상관없이 클라이언트가 보고 있는 화면의 목록)
  // 검색창 값
  const [ser, setSer] = useState('');

  // pick 조회 값
  const [pick, setPick] = useState([]);

  // sellState 카테고리 변경 json
  const state = {
    peed: '사료',
    snack: '간식',
    product: '용품',
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // 처음 basic이 들어오면 전체라는 거니까 전체 정보를 갖고 있는 all
    if (sellState === 'basic') setSell([...all]);
    else {
      // 전체에서 filter을 걸어야 하잖아요.
      // 현재 sell은 이미 다른 filter가 걸려있는 친구. ( all에서 filter을 진행)
      // 이때 filter을 하는 조건이 all 리스트에 들어있는 친구들의 category가 내가 누른 btnState에 맞는 한글이어야 해요.
      // 이걸 하나씩 if문으로 하는 게 아니라 위에 json 형태로 만들어놓고 btnState 즉, 영어로 들어온 값이 맞춰서 검색을 하는 거지
      const newArray = all.filter((data) => data.category == state[sellState]);
      // filter라는 것은 뒤에 쓴 조건에 맞는 친구들을 모아서 리스트로 반환해줘요.
      console.log(newArray);
      setSell([...newArray]);
    }
  }, [sellState]);

  // console.log('판매페이지 sell 값', sell);

  /*판매글 가져오는 함수* */
  const getData = async () => {
    axios.get('supplies/getData').then((res) => {
      // console.log('res.data', res.data);
      setSell(res.data);
      setAll(res.data);
    });
    //pick 좋아요 테이블 조회 (userId가 찜한 글 조회)
    axios.get('pick/getLike').then((result) => {
      setPick(result.data);
      console.log('setPick res1123:', result.data);
      console.log('setPick res-----:', pick);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(pick);
  }, [pick]);

  return (
    <>
      <Nav />
      <div className={styles.sellPage}>
        <section>
          <Category />
          <div className={styles.AvailSaleContainer}>
            <SellCategory setSell={setSell} />
            {/* SellCategory 검색 값*/}
            <input value={ser} type="hidden" />
            <div className={styles.cardContainer}>
              {sell.map((list, index) => {
                return <Card key={index} list={list} pick={pick} />;
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SellPage;
