import styles from './css/SellPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import Card from '../components/Card';
import SellCategory from '../components/SellCategory';

// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const SellPage = (props) => {
  // const navigate = useNavigate();

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
      <Nav />
      <div className={styles.sellPage}>
        <section>
          <Category />
          <div className={styles.AvailSaleContainer}>
            <SellCategory />
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
        </section>
      </div>
    </>
  );
};

export default SellPage;
