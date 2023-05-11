import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './css/MyPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import EditUserInfoModal from '../components/EditUserInfoModal';
import CustomCardSlider from '../components/CustomCardSlider';
import CustomPetSlider from '../components/CustomPetSlider';
import { setPets } from '../store/module/pets';
import TestImg from '../assets/TestImg1.jpg';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyPage = (props) => {
  const dispatch = useDispatch();
  const btnState = useSelector((state) => state.typeSwitch.switchState);
  const pets = useSelector((state) => state.pets.pets);
  const pet = localStorage.getItem('pet');
  const isLoggedIn = sessionStorage.getItem('userId');
  const [all, setAll] = useState([]); //전체목록
  const [sell, setSell] = useState([]); // 현재유저가 올린 판매글
  const [buy, setBuy] = useState([]); // 현재유저가 구매한 글
  const [like, setLike] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [petDatas, setPetDatas] = useState([]);
  const [nickname, setNickname] = useState([]);
  let cardData;
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 값이 있으면, 펫 데이터 체크
    getSellData();
    getLikeData();
    getpetIds();
    getBuyData();
    axios
      .post('pet/checkPet', {
        userID: isLoggedIn,
      })
      .then((res) => {
        setPetDatas(res.data);
      });
  }, []);

  // 유저 닉네임 가져오기
  useEffect(() => {
    axios
      .get('kakao/getNickName', {
        params: { id: isLoggedIn },
      })
      .then((res) => {
        setNickname(res.data.nickname);
      });
  }, []);

  const getpetIds = () => {
    axios
      .get('kakao/getPetId', {
        params: {
          userId: isLoggedIn,
        },
      })
      .then((res) => {
        /*백에서 불러온 펫 데이터*/
        dispatch(setPets(res.data));
        sessionStorage.setItem('pet', res.data);
      });
  };

  //회원 탈퇴
  function onUserDelete() {
    const access_token = localStorage.getItem('access_token');
    const userId = sessionStorage.getItem('userId');

    let confirm = window.confirm('정말로 탈퇴하시겠습니까?');

    if (confirm) {
      axios
        .delete('/kakao/userDelete', {
          data: {
            access_token,
            userId,
          },
        })
        .then(() => {
          sessionStorage.clear();
          localStorage.clear();
          alert('회원 탈퇴가 완료 되었습니다.');
          navigate('/');
        });
    }
  }

  /**로그인한 유저가 찜한 판매글 가져오는 함수*/
  const getLikeData = () => {
    axios
      .get('pick/userPick', {
        params: {
          userId: isLoggedIn,
        },
      })
      .then((res) => {
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
          supply['user'] = { nickname: res.data[i].user.nickname };

          userPick.push(supply);
        }
        setLike(userPick);
      });
  };

  /*로그인한 유저가올린 판매글 가져오는 함수* */
  const getSellData = async () => {
    axios
      .get('supplies/getData', {
        params: {
          type: 'basic',
          location: 'location',
        },
      })
      .then((res) => {
        cardData = res.data;
        let myData = [];
        res.data.map((el) => {
          if (el.userId === isLoggedIn) {
            setSell((prev) => [...prev, el]);
          }
        });
      });
  };

  /**로그인한 유저가 구매한 글 가져오는 함수 */
  const getBuyData = () => {
    axios
      .get('supplies/getData', {
        params: {
          type: 'basic',
          location: 'location',
          buyer: isLoggedIn,
        },
      })
      .then((res) => {
        setBuy(res.data);
      });
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
                <h2>{nickname}님 안녕하세요</h2>
                <p
                  onClick={() => {
                    setDisplayModal(true);
                  }}
                >
                  회원 정보 수정
                </p>
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
                    onClick={() => {
                      navigate('/petProfile');
                    }}
                    className={`${styles[`${btnState}`]}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </section>

            <section>
              <div>
                <h2 className={styles.titleIndex}>찜</h2>
                <div className={styles.cards}>
                  <CustomCardSlider datas={like} />
                </div>
              </div>

              <div>
                <h2 className={styles.titleIndex}>판매</h2>
                <div className={styles.cards}>
                  <CustomCardSlider datas={sell} />
                </div>
              </div>

              <div>
                <h2 className={styles.titleIndex}>구매</h2>
                <div className={styles.cards}>
                  <CustomCardSlider datas={buy} />
                </div>
              </div>
            </section>
            <button
              className={styles.deleteButton}
              onClick={() => {
                if (window.confirm('정말 탈퇴하겠습니까?')) {
                  onUserDelete();
                } else {
                  return;
                }
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
