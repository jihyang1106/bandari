import Card from './Card';

import styles from '../css/sellPage/AvailCards.module.css';
import SellCategory from './SellCategory';
import { useState } from 'react';
import SellForm from './SellForm';
// import { useNavigate } from 'react-router-dom';

export default function SellPageMain(props) {
  // const navigate = useNavigate();

  // setIsSale 값이 false면 상품 판매 목록, 기본틀 true면 판매 글쓰기가 보임
  const [isSale, setIsSale] = useState(false);

  // 서버 데이터 구축 되면, 요청
  // 임시데이터
  let data = [
    {
      userID: 1,
      title: '고양이 이동장 팝니다.',
      price: '25000',
      location: '용산 어디어디 오디',
      saleStatus: false,
      likeStatus: false,
      cardImg: 'Test.png',
    },
    {
      userID: '2',
      title: '강아지 배변 패드 팝니다.',
      price: '25000',
      location: '용산 어디어디 오디',
      saleStatus: false,
      likeStatus: false,
      cardImg: 'Test.png',
    },
    {
      userID: '3',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: 'Test.png',
    },
    {
      userID: '4',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: 'Test.png',
    },
    {
      userID: '5',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: 'Test.png',
    },
    {
      userID: '6',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: 'Test.png',
    },
  ];

  return (
    <>
      <div className={styles.AvailSaleContainer}>
        {/* 판매 페이지 상단 카테고리  */}
        <SellCategory setIsSale={setIsSale} />

        {/* 판매 카드 글 리스트 */}
        {!isSale ? (
          <div className={styles.cardContainer}>
            {data.map((list, index) => {
              return (
                <>
                  <Card key={index} list={list} />
                </>
              );
            })}
          </div>
        ) : (
          <SellForm setIsSale={setIsSale} />
        )}
      </div>
    </>
  );
}
