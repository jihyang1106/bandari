import styles from './css/SalesFost.module.css';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Nav from '../components/Nav';
import Category from '../components/Category';

// slick-carousel css
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import axios from 'axios';
import $ from 'jquery';

const SalesFost = () => {
  const navigate = useNavigate();
  // state 취득
  const location = useLocation();
  const datas = location.state;

  function onChattingBtn() {
    console.log('채팅하기 버튼 눌림');
    navigate('/chatPage');
  }

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
  let newImgs
  if(datas.imgs.length > 0 ){
 const imgs = [datas.imgs[0].img1,datas.imgs[0].img2, datas.imgs[0].img3]
  newImgs = imgs.filter((el)=>el != null);
  }

  return (
    <>
      <Nav />
      <div className={styles.sellForm}>
        <section>
          <Category />
          <form className={styles.sellFormContent}>
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
                  {datas.imgs.length > 0 ?
                  newImgs.map((el)=>(
                    <img src={`/uploadImg/${el}`} alt="대표 사진" className={styles.sellImges}/>
                  ))
                  : null}
                </Slider>
              </div>
              <div>
                {/* <Slider {...settings}>
                  {imgData.map((images, index) => {
                    return (
                      <img
                        key={index}
                        src={images}
                        alt={`${images}-${index}`}
                        className={`${styles.sellImges}`}
                      ></img>
                    );
                  })}
                </Slider> */}
              </div>
            </div>

            {/* 작성자 / 제목 / 가격 데이터 */}
            <p className={`${styles.formUserInfo} ${styles.formUserInfo_1}`}>
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
                <img src="" alt="" />
              </div>
              <div className={styles.petInfo}>
                <p>보리</p>
                <p>10세(2018년12개월) / 남아 / 푸들 / 5~10kg</p>
                <p>보리 입니다~</p>
              </div>
            </div>

            {/* 채팅방 버튼 */}
            <div className={styles.submitButton}>
              <button
                type="button"
                onClick={() => {
                  onChattingBtn();
                }}
              >
                연락하기
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default SalesFost;
