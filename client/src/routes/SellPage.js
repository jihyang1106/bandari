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
  const isLoggedIn = useSelector((state) => state.user.user.isLogin);
  const [all, setAll] = useState([]); // 전체 목록을 항상 가지고 있는 state -> 처음에 세팅되면 바뀔 일이 없어요
  const [sell, setSell] = useState([]); // 화면에 보여지는 state ( 전체, 사료 이런 거상관없이 클라이언트가 보고 있는 화면의 목록)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // pick 조회 값
  const [pick, setPick] = useState([]);

  // sellState 카테고리 변경 json
  const state = {
    peed: '사료',
    snack: '간식',
    product: '용품',
  };

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
      // console.log(newArray);
      setSell([...newArray]);
    }
  }, [sellState]);

  /*판매글 가져오는 함수* */
  const getData = async () => {
    axios.get('supplies/getData').then((res) => {
      setSell(res.data);
      setAll(res.data);
      console.log('판매글 getData  :', res.data);
      // for (let i = 0; i < res.data.length; i++) {
      //   console.log('포문 시험', res.data[i].picks);
      // }
    });
  };

  // pick db에서 ( 유저아이디 && 글번호 )
  // const pickSt = {

  // }
  // useEffect(() => {
  //픽 데이터
  // const newPickArr = all.filter((data) => data[i].picks);
  // console.log('allll', all[3].picks);
  // const newPickArr = all.map((el, index) => {
  //   setPick(el.picks);
  //   console.log('2133sadddddddddd3333', el.picks);
  // });
  // setPick([...newPickArr]);
  // console.log('setPick', pick);
  // const pickDatas = all[i].picks;
  // console.log('pickDatas+++', pickDatas);
  // console.log('=========', pickDatas.length);
  // setPick(pickDatas.length);

  // if (pickDatas !== null) {
  //   // pick 값이 값이 있으면?
  //   // if (pickDatas.suppliesId && pickDatas.suppliesId) {
  //   //   //유저아이디와 용품pk 값이 있다면? => 나든 누구든 찜을 했다.
  //   if (pickDatas.userId == isLoggedIn && pickDatas.suppliesId) {
  //     // 값이 있으면 => 찜 버튼 활성화
  //     console.log('내가 찜한 글 !!!');
  //   } else {
  //     // 버튼 활성 x /
  //     console.log('누군가 찜하긴 함..');
  //   }
  // } else {
  //   // 아얘 찜이 없는 글
  //   console.log('찜 값이 없는 글!!');
  // }
  // // }
  //   return;
  // }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Nav />
      <div className={styles.sellPage}>
        <section>
          <Category />
          <div className={styles.AvailSaleContainer}>
            <SellCategory setSell={setSell} />
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
