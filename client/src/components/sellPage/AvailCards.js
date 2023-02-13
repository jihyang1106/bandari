import React from 'react';
import Card from './Card';
// import CategoryButton from './CategoryButton.js';
// import AdressPickButton from './AdressPickButton.js';
import styles from '../css/sellPage/AvailCards.module.css';

export default function AvailCards() {
  // 서버 데이터 구축 되면, 요청
  // 임시데이터
  let data = [
    {
      userID: '누구 님',
      title: '고양이 이동장 팝니다.',
      price: '25000',
      location: '용산 어디어디 오디',
      saleStatus: false,
      likeStatus: false,
      cardImg: '/Test.png',
    },
    {
      userID: '누구 님',
      title: '강아지 배변 패드 팝니다.',
      price: '25000',
      location: '용산 어디어디 오디',
      saleStatus: false,
      likeStatus: false,
      cardImg: '/Test.png',
    },
    {
      userID: '누구 님',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: '/Test.png',
    },
    {
      userID: '누구 님',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: '/Test.png',
    },
    {
      userID: '누구 님',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: '/Test.png',
    },
    {
      userID: '누구 님',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: '/Test.png',
    },
  ];

  return (
    <>
      {/* 카테고리 / 검색 / 판매하기 버튼 */}
      {/* <div className={styles.AvailSaleContainer}>
        <span className={styles.categoryButtonContainer}>
          <AdressPickButton />
          <CategoryButton text={'전체'} />
          <CategoryButton text={'사료'} />
          <CategoryButton text={'간식'} />
          <CategoryButton text={'용품'} />
        </span>
        <span className={styles.shearchNav}>
          <input type="text" className={styles.shearchInput} />
          <CategoryButton text={'검색'} />
          <button className={styles.saleButton}>판매하기</button>
        </span>
      </div> */}
      {/* 리스트 > 제목, 가격, 위치, 판매 상태, 찜 상태, 사진 경로    위치는 위도 경도 location={Latitude/longitude} */}
      <div className={styles.cardContainer}>
        <div>
          {data.map((list, index) => {
            return (
              <>
                <Card
                  key={index}
                  title={list.title}
                  price={list.price}
                  location={list.location}
                  // saleStatus={list.saleStatus}
                  // likeStatus={list.likeStatus}
                  cardImg={list.cardImg}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
