import React from 'react';

import styles from './css/MyPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import Card from '../components/Card';

const MyPage = (props) => {
  function onUserDelete() {
    console.log('회원 탈퇴 버튼 눌림');
  }

  function petAddUpload() {
    console.log('마이페이지 내 새꾸 프로필 추가)');
  }
  let data = [
    {
      id: 1,
      userID: '보리 언니',
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
      <Nav />
      <div className={styles.myPage}>
        <section>
          <Category />
          <form className={styles.MyPageForm}>
            {/* 제목, 가격 데이터 */}
            <div>
              <p className={styles.subTitle}>마이 페이지</p>
              <p className={styles.subTitle}>{data[0].userID}님 안녕하세요</p>
              <p className={styles.subTitle}>회원 정보 수정</p>
            </div>

            {/* 등록된 반려동물 정보*/}
            <div>
              <p className={styles.titleIndex}>내 새꾸 ♥</p>
              <div className={`${styles.sellectedPet} ${styles.marginBottom}`}>
                <div className={styles.petImg}>
                  <img src="" alt="" />
                </div>
                <div className={styles.petInfo}>
                  <p>보리</p>
                  <p>10세 (2018년 12개월) / 남아 / 푸들 / 15~10kg</p>
                  <p>보리 입니다~</p>
                </div>
              </div>

              {/* 내 새꾸 프로필 추가 */}
              <div className={`${styles.petImges} ${styles.marginBottom}`}>
                <div
                  onClick={() => {
                    petAddUpload();
                  }}
                >
                  +
                </div>
              </div>
            </div>

            <section>
              <h1 className={styles.titleIndex}>찜</h1>
              <div className={styles.cards}>
                {data.map((data, index) => {
                  return (
                    <>
                      <Card key={data.id} list={data} />
                    </>
                  );
                })}
              </div>

              <h1 className={styles.titleIndex}>판매</h1>
              <div className={styles.cards}>
                {data.map((data, index) => {
                  return (
                    <>
                      <Card key={data.id} list={data} />
                    </>
                  );
                })}
              </div>

              <h1 className={styles.titleIndex}>구매</h1>
              <div className={styles.cards}>
                {data.map((data, index) => {
                  return (
                    <>
                      <Card key={data.id} list={data} />
                    </>
                  );
                })}
              </div>

              <button
                className={styles.deleteButton}
                onClick={() => {
                  onUserDelete();
                }}
              >
                회원 탈퇴
              </button>
            </section>
          </form>
        </section>
      </div>
    </>
  );
};

export default MyPage;
