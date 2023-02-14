import React from 'react';
import styles from './css/MyPageMain.module.css';
import Card from './sellPage/Card';

export default function MyPageForm(props) {
  let data = [
    {
      id: 1,
      userID: '누구 님',
      title: '고양이 이동장 팝니다.',
      price: '25000',
      location: '용산 어디어디 오디',
      saleStatus: false,
      likeStatus: false,
      cardImg: '/Test.png',
    },
    {
      id: 2,
      userID: '누구 님',
      title: '강아지 배변 패드 팝니다.',
      price: '25000',
      location: '용산 어디어디 오디',
      saleStatus: false,
      likeStatus: false,
      cardImg: '/Test.png',
    },
    {
      id: 3,
      userID: '누구 님',
      title: '사료 기호성 테스트 키트.',
      price: '10000',
      location: '어디어디 오디',
      saleStatus: true,
      likeStatus: true,
      cardImg: '/Test.png',
    },
    {
      id: 4,
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
      <form className={styles.MyPageForm}>
        {/* 제목, 가격 데이터 */}
        <div className={styles}>
          <p className={styles}>@@@ 님 안녕하세요</p>
          <p className={styles}>회원 정보 수정</p>
        </div>

        {/* <div className={styles.marginBottom}>
          <p className={styles.formSubTitle}>내 새꾸 ♥</p>
          <input type="text" value={props.price} />
        </div> */}

        {/* 등록된 반려동물 정보*/}
        <p className={styles.petLabel}>내 새꾸 ♥</p>
        <div className={styles.sellectedPet}>
          <div className={styles.petImg}>
            <img src="" alt="" />
          </div>
          <div className={styles.petInfo}>
            <p>보리</p>
            <p>10세(2018년12개월) / 남아 / 푸들 / 5~10kg</p>
            <p>보리 입니다~</p>
          </div>
        </div>

        {/* 업로드 이미지*/}
        <div className={`${styles.petImges} ${styles.marginBottom}`}>
          <div>+</div>
        </div>

        {/* 취소 수정 버튼 */}
        <div className={styles.submitButton}>
          <button className={styles.marginBottom}>취소</button>
          <button className={styles.marginBottom}>수정</button>
        </div>

        <section>
          <h1>찜</h1>
          <div className={styles.cards}>
            {data.map((data, index) => {
              return (
                <>
                  <Card key={data.id} list={data} />
                </>
              );
            })}
          </div>

          <h1>판매</h1>
          <div className={styles.cards}>
            {data.map((data, index) => {
              return (
                <>
                  <Card key={data.id} list={data} />
                </>
              );
            })}
          </div>

          <h1>구매</h1>
          <div className={styles.cards}>
            {data.map((data, index) => {
              return (
                <>
                  <Card key={data.id} list={data} />
                </>
              );
            })}
          </div>
        </section>
      </form>
    </>
  );
}
