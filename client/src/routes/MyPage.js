import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './css/MyPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import EditUserInfoModal from '../components/EditUserInfoModal';
import CustomCardSlider from '../components/CustomCardSlider';
import CustomPetSlider from '../components/CustomPetSlider';

import TestImg from '../assets/TestImg1.jpg';
import { useNavigate } from 'react-router-dom';

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

let pets = [
  {
    name: '보리',
    age: '2018년 12개월',
    gender: '남아',
    petType: '푸들',
    weight: '10~15kg',
    petImg: TestImg,
    info: '보리입니다~',
  },
  {
    name: '보리',
    age: '2018년 12개월',
    gender: '남아',
    petType: '푸들',
    weight: '10~15kg',
    petImg: TestImg,
    info: '보리입니다~',
  },
  {
    name: '보리',
    age: '2018년 12개월',
    gender: '남아',
    petType: '푸들',
    weight: '10~15kg',
    petImg: TestImg,
    info: '보리입니다~',
  },
  {
    name: '보리',
    age: '2018년 12개월',
    gender: '남아',
    petType: '푸들',
    weight: '10~15kg',
    petImg: TestImg,
    info: '보리입니다~',
  },
];

const MyPage = (props) => {
  const btnState = useSelector((state) => state.typeSwitch.switchState);
  const [displayModal, setDisplayModal] = useState(false);
  const navigate = useNavigate();

  function onUserDelete() {
    console.log('회원 탈퇴 버튼 눌림');
  }

  /**펫 추가 이벤트 */
  function petAddUpload() {
    console.log('마이페이지 내 새꾸 프로필 추가)');
    navigate('/petProfile');
  }

  /**회원정보수정모달 */
  const onClickEditUserInfo = () => {
    setDisplayModal(true);
  };

  return (
    <>
      <Nav />
      <div className={`${styles.myPage} ${styles[`${displayModal}`]}`}>
        <section>
          <Category />
          <div className={styles.MyPageContainer}>
            {/* 제목, 가격 데이터 */}
            <div>
              <h1>마이 페이지</h1>
              <h2>{data[0].userID}님 안녕하세요</h2>
              <p onClick={onClickEditUserInfo}>회원 정보 수정</p>
            </div>

            {/* 등록된 반려동물 정보*/}
            <div className={`${styles.myPetsInfo} ${styles[`${btnState}`]}`}>
              <p className={styles.titleIndex}>내 새꾸 ♥</p>
              <div>
                <CustomPetSlider petdatas={pets} />
                <button
                  onClick={petAddUpload}
                  className={`${styles[`${btnState}`]}`}
                >
                  +
                </button>
              </div>
            </div>

            <section>
              <h2 className={styles.titleIndex}>찜</h2>
              <div className={styles.cards}>
                <CustomCardSlider datas={data} />
              </div>

              <h2 className={styles.titleIndex}>판매</h2>
              <div className={styles.cards}>
                <CustomCardSlider datas={data} />
              </div>

              <h2 className={styles.titleIndex}>구매</h2>
              <div className={styles.cards}>
                <CustomCardSlider datas={data} />
              </div>
            </section>
          </div>
        </section>
        <div>
          <EditUserInfoModal
            display={displayModal}
            setDisplay={setDisplayModal}
          />
        </div>
        <button
          className={styles.deleteButton}
          onClick={() => {
            onUserDelete();
          }}
        >
          회원 탈퇴
        </button>
      </div>
    </>
  );
};

export default MyPage;
