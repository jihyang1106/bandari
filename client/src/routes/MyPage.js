import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './css/MyPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import EditUserInfoModal from '../components/EditUserInfoModal';
import CustomCardSlider from '../components/CustomCardSlider';
import CustomPetSlider from '../components/CustomPetSlider';

import TestImg from '../assets/TestImg1.jpg';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyPage = (props) => {
  const btnState = useSelector((state) => state.typeSwitch.switchState);
  const pets = useSelector((state) => state.pets.pets);
  const isLoggedIn = sessionStorage.getItem('userId');
  const [all, setAll] = useState([]); //전체목록
  const [sell, setSell] = useState([]); // 현재유저가 올린 판매글
  const [like, setLike] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [petDatas, setPetDatas] = useState([]);
  let cardData;
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 값이 있으면, 펫 데이터 체크
    if (!isLoggedIn) {
      alert('로그인 해주세요');
      navigate('/');
      return;
    } else {
      getData();
      getLikeData();

      axios
        .post('pet/checkPet', {
          userID: isLoggedIn,
        })
        .then((res) => {
          console.log('유저의 펫 db 조회:', res.data);
          setPetDatas(res.data);
        });
    }
  }, []);

  function onUserDelete() {
    console.log('회원 탈퇴 버튼 눌림');
  }
  /*로그인한 유저가올린 판매글 가져오는 함수* */
  const getData = async () => {
    axios.get('supplies/getData').then((res) => {
      console.log('판매글 getData  :', res.data);
      cardData = res.data;
      res.data.map((data) => {
        if (data.userId === isLoggedIn) {
          setSell([...sell, data]);
        }
      });
      setAll(res.data);
    });
  };

  /**로그인한 유저가 찜한 판매글 가져오는 함수*/
  const getLikeData = () => {
    axios
      .get('pick/userPick', {
        params: {
          userId: isLoggedIn,
        },
      })
      .then((res) => {
        console.log('찜', res.data);
        let userPick = [];

        for (let i = 0; i < res.data.length; i++) {
          const supply = res.data[i].supply;
          supply['picks'] = [
            {
              id: res.data[i].id,
              suppliesId: res.data[i].suppliesId,
              userId: res.data[i].userId,
            },
          ];
          userPick.push(supply);
        }
        console.log('어레이', userPick);
        setLike(userPick);
      });
  };

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
            {/* 유저, 펫 정보들 */}
            <section>
              {/* 유저정보 */}
              <div>
                <h1>마이 페이지</h1>
                <h2>{isLoggedIn}님 안녕하세요</h2>
                <p onClick={onClickEditUserInfo}>회원 정보 수정</p>
              </div>

              {/* 펫정보*/}
              <div className={`${styles.myPetsInfo} ${styles[`${btnState}`]}`}>
                <p className={styles.titleIndex}>내 새꾸 ♥</p>
                <div>
                  {pets.length > 0 ? (
                    <CustomPetSlider petdatas={petDatas} />
                  ) : (
                    <p>등록된 펫이 없습니다</p>
                  )}
                  <button
                    onClick={petAddUpload}
                    className={`${styles[`${btnState}`]}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h2 className={styles.titleIndex}>찜</h2>
              <div className={styles.cards}>
                <CustomCardSlider datas={like} />
              </div>

              <h2 className={styles.titleIndex}>판매</h2>
              <div className={styles.cards}>
                <CustomCardSlider datas={sell} />
              </div>

              <h2 className={styles.titleIndex}>구매</h2>
              <div className={styles.cards}></div>
            </section>
            <button
              className={styles.deleteButton}
              onClick={() => {
                onUserDelete();
              }}
            >
              회원 탈퇴
            </button>
          </div>
        </section>
        <div>
          <EditUserInfoModal
            display={displayModal}
            setDisplay={setDisplayModal}
          />
        </div>
      </div>
    </>
  );
};

export default MyPage;
