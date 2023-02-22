import styles from './css/SalesDetail.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Nav from '../components/Nav';
import Category from '../components/Category';

// slick-carousel css
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SalesDetail = () => {
  const navigate = useNavigate();
  // state 취득
  const location = useLocation();
  const datas = location.state;
  const [pet, setPet] = useState([]);
  const btnState = useSelector((state) => state.typeSwitch.switchState);

  const userId = useSelector((state) => state.user.user.isLogin);
  console.log(datas);
  const { id } = useParams();

  // slick-carousel settings
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  /* img값이 2개 이상일 때 null 값을 제외한 이미지 배열  */
  let newImgs;
  if (datas.imgs.length > 0) {
    const imgs = [datas.imgs[0].img1, datas.imgs[0].img2, datas.imgs[0].img3];
    newImgs = imgs.filter((el) => el != null);
  }

  // 상세페이지 렌더 시 글에 맞는 펫 정보 가져오기
  useEffect(() => {
    axios
      .get('pet/getData', {
        params: { id: datas.petId },
      })
      .then((res) => {
        setPet(res.data);
      });
  }, []);

  // 프론트로 보내는 데이터
  const result = { pet: pet, supplies: datas };

  // 서버로 보내는 데이터
  const backData = {
    suppliesId: datas.id, // 글 id
    userId: userId, // 로그인한 유저 id
    otherId: datas.userId, // 글 작성 id
  };

  // 채팅하기 버튼
  const onChattingBtn = () => {
    // 판매완료시
    if (!datas.deal) {
      alert('판매완료된 상품입니다');
    } else {
      if (userId === false) {
        alert('로그인 후 연락해주세요');
        navigate('/');
      } else {
        axios.post('room/insert', backData).then((res) => {
          console.log('생성 판별 여부', res.data);
        });
        navigate('/chatPage');
      }
    }
  };

  return (
    <>
      <Nav />
      <div className={styles.sellForm}>
        <section>
          <Category />
          <form
            className={`${styles.sellFormContent} ${styles[`${btnState}`]} 
              }`}
          >
            {/* 업로드 된 이미지 미리보기 슬라이드 */}
            <div className={styles.sliderDiv}>
              <div className={`${styles.sellImges}`}>
                <Slider {...settings}>
                  <img
                    src={`/uploadImg/${datas.cover}`}
                    alt="대표 사진"
                    className={styles.sellImges}
                  />
                  {/* 이미지 2개 이상일 때 이미지 보여주기 */}
                  {datas.imgs.length > 0
                    ? newImgs.map((el) => (
                        <img
                          src={`/uploadImg/${el}`}
                          alt="대표 사진"
                          className={styles.sellImges}
                        />
                      ))
                    : null}
                </Slider>
              </div>
              <div></div>
            </div>

            {/* 작성자 / 제목 / 가격 데이터 */}
            <p
              className={`${styles.formUserInfo} ${styles.formUserInfo_1} ${
                styles[`num${datas.imgs.length}`]
              }`}
            >
              {datas.userId}
            </p>
            {/* 유저 아이디 대신 닉네임으로 대체 예정 */}
            <p className={styles.formUserInfo}>{datas.location}</p>
            <div className={styles.petPrifDisplay}>
              <p className={styles.formSubTitle}>제목</p>
              <input
                type="text"
                defaultValue={datas.title}
                className={styles.inputWidth}
              />
            </div>
            <div className={styles.petPrifDisplay}>
              <p className={styles.formSubTitle}>가격</p>
              <input
                type="text"
                defaultValue={`${datas.price} 원`}
                className={styles.inputWidth}
              />
            </div>

            <div className={styles.petPrifDisplay}>
              <p className={`${styles.formSubTitle} ${styles.content}`}>설명</p>
              <textarea defaultValue={`${datas.content}`}></textarea>
            </div>

            {/* 선택된 반려동물 정보 /사진 / 정보 & 소개글 */}
            <p className={styles.petLabel}>사용한 반려동물</p>
            <div className={styles.sellectedPet}>
              <div className={styles.petImg}>
                {/* <img src={`/petImg/${pet.petImg}`} alt="" /> */}
              </div>
              <div className={styles.petInfo}>
                <p>{pet.name}</p>
                <p>
                  {pet.age} / {pet.gender} / {pet.petSpeices} / {pet.weight}
                </p>
                <p>{pet.info}</p>
              </div>
            </div>

            {/* 채팅방 버튼 */}
            <div className={styles.submitButton}>
              {userId != datas.userId ? (
                <button type="button" onClick={onChattingBtn}>
                  연락하기
                </button>
              ) : (
                <>
                  {' '}
                  <button type="button">수정</button>&nbsp;
                  <button type="button">삭제</button>
                </>
              )}
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default SalesDetail;
