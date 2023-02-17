import styles from './css/SellForm.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import SellForm from '../components/SellForm';

import { useState } from 'react';

const SellPage = (props) => {
  // setIsSale 값이 false면 상품 판매 목록, true면 판매 글쓰기 폼
  // const [isSale, setIsSale] = useState(false);

  return (
    <>
      <Nav />
      <div className={styles.sellForm}>
        <section>
          <Category />
          {/* 판매 페이지 상단 카테고리  */}
          {/* {!isSale && <SellForm setIsSale={setIsSale} />} */}
          <SellForm />
        </section>
      </div>
    </>
  );
};

export default SellPage;
