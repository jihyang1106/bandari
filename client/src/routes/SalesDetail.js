import styles from './css/SalesDetail.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Nav from '../components/Nav';
import Category from '../components/Category';

// slick-carousel css
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import styled, { keyframes, css } from 'styled-components';
import $ from 'jquery';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const StyledSlider = styled(Slider)`
  .slick-list {
    //슬라이드 스크린
    width: 300px;
    height: 300px;
    margin: 0;
    overflow-x: hidden;
    margin-top: 30px;
  }
  .slick-dots {
    //슬라이드의 위치
    margin-top: 70px;
  }
  .slick-track {
    //이건 잘 모르겠음
    width: 100%;
    height: 100%;
  }
  .slick-prev:before,
  .slick-next:before {
    color: black;
    left: -45px;
  }

  .slick-next:before {
    color: black;
    right: -45px;
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 25px;
  }

  .slick-next {
    right: -45px;
  }

  @media screen and (max-width: 2200px) {
  }

  @media screen and (max-width: 1500px) {
  }

  @media screen and (max-width: 1200px) {
  }
`;

const SalesDetail = () => {
  const navigate = useNavigate();
  // state 취득
  const location = useLocation();
  const datas = location.state;
  const [pet, setPet] = useState([]);
  const btnState = useSelector((state) => state.typeSwitch.switchState);
  const [newImgs, setnewImgs] = useState([]);
  const userId = sessionStorage.getItem('userId');

  const { id } = useParams();
  const titleRef = useRef();
  const priceRef = useRef();
  const contentRef = useRef();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  /* img값이 2개 이상일 때 null 값을 제외한 이미지 배열  */
  // let newImgs = [];

  if (datas.imgs == undefined) {
    axios
      .get('supplies/getImgs', {
        params: {
          suppliesId: datas.id,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          const imgs = [res.data[0].img1, res.data[0].img2, res.data[0].img3];
          newImgs.push(imgs.filter((el) => el != null));
        }
      });
  } else if (datas.imgs.length > 0) {
    const imgs = [datas.imgs[0].img1, datas.imgs[0].img2, datas.imgs[0].img3];
    newImgs.push(imgs.filter((el) => el != null));
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
        axios.post('room/insert', backData).then(() => {
          navigate('/chatPage');
          window.location.reload();
        });
      }
    }
  };

  /**수정하기 */
  const onClickEdit = () => {
    console.log(Number(priceRef.current.value));
    if (Number(priceRef.current.value) == 0)
      alert('가격에 숫자를 입력해주세요');
    else {
      axios
        .patch('/supplies/patchSupplies', {
          data: {
            suppliesId: datas.id,
            title: titleRef.current.value,
            price: priceRef.current.value,
            content: contentRef.current.value,
          },
        })
        .then((res) => {
          alert(` ${titleRef.current.value}상품의 정보가 수정되었습니다.`);
          navigate('/sellPage');
        });
    }
  };

  /**상품 글 삭제하기 */
  const onClickDel = () => {
    console.log(datas.id);
    axios
      .delete('/supplies/deleteSupplies', {
        data: { suppliesId: datas.id },
      })
      .then(() => {
        alert('상품 글이 삭제되었습니다.');
        navigate('/sellPage');
      });
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
            <div className={`${styles.sellImges}`}>
              <StyledSlider {...settings}>
                <img
                  src={`/uploadImg/${datas.cover}`}
                  alt="대표 사진"
                  className={styles.sellImges}
                />
                {/* 이미지 2개 이상일 때 이미지 보여주기 */}
                {newImgs.length > 0
                  ? newImgs[0].map((el) => (
                      <img
                        src={`/uploadImg/${el}`}
                        alt="대표 사진"
                        className={styles.sellImges}
                      />
                    ))
                  : null}
              </StyledSlider>
              <div></div>
            </div>

            {/* 작성자 / 제목 / 가격 데이터 */}
            <p className={`${styles.formUserInfo} ${styles.formUserInfo_1}`}>
              {datas.userId}
            </p>
            {/* 유저 아이디 대신 닉네임으로 대체 예정 */}
            <p className={styles.formUserInfo}>{datas.location}</p>
            <div className={styles.petPrifDisplay}>
              <p className={styles.formSubTitle}>제목</p>
              {userId != datas.userId ? true : false}
              <input
                readOnly={userId != datas.userId ? true : false}
                type="text"
                defaultValue={`${datas.title}`}
                className={styles.inputWidth}
                ref={titleRef}
              />
            </div>
            <div className={styles.petPrifDisplay}>
              <p className={styles.formSubTitle}>가격</p>
              <input
                readOnly={userId != datas.userId ? true : false}
                type="number"
                step="1000"
                defaultValue={datas.price}
                className={styles.inputWidth}
                ref={priceRef}
              />
            </div>

            <div className={styles.petPrifDisplay}>
              <p className={`${styles.formSubTitle} ${styles.content}`}>설명</p>
              <textarea
                readOnly={userId != datas.userId ? true : false}
                defaultValue={`${datas.content}`}
                ref={contentRef}
              ></textarea>
            </div>

            {/* 선택된 반려동물 정보 /사진 / 정보 & 소개글 */}
            <p className={styles.petLabel}>사용한 반려동물</p>
            <div className={styles.sellectedPet}>
              <div>
                <img
                  className={styles.petImg}
                  src={`/petImg/${pet.petImg}`}
                  alt=""
                />
              </div>
              <div className={styles.petInfo}>
                <h1>{pet.name}</h1>
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
                  <button type="button" onClick={onClickEdit}>
                    수정
                  </button>
                  {/* &nbsp; */}{' '}
                  <button type="button" onClick={onClickDel}>
                    삭제
                  </button>
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
