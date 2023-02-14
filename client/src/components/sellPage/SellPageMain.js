import Card from './Card';

import styles from '../css/sellPage/AvailCards.module.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SellCategory from './SellCategory';
import SalesFost from './SalesFost';
// import $ from 'jquery';
// import { useNavigate } from 'react-router-dom';

export default function SellPageMain() {
  // const navigate = useNavigate();

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
      cardImg: '/Test.png',
    },
    {
      userID: '2',
      title: '강아지 배변 패드 팝니다.',
      price: '25000',
      location: '용산 어디어디 오디',
      saleStatus: false,
      likeStatus: false,
      cardImg: '/Test.png',
    },
    {
      userID: '3',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: '/Test.png',
    },
    {
      userID: '4',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: '/Test.png',
    },
    {
      userID: '5',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: '/Test.png',
    },
    {
      userID: '6',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: '/Test.png',
    },
  ];

  // const onClickCard = () => {
  //   navigator('/')
  // }
  // `'/${props.userID + 글번호}'`

  // $(cardRef.current).click(() => {
  //   navigate('http:/localhost:3000');
  // });

  return (
    <>
      <div className={styles.AvailSaleContainer}>
        {/* 판매 페이지 상단 카테고리  */}
        <SellCategory />

        {/* 판매 카드 글 리스트 */}
        <div className={styles.cardContainer}>
          {data.map((list, index) => {
            return (
              <>
                <Card key={index} list={list} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
