import React, { useRef, useState } from 'react';
import styles from './css/SellForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
// slick-carousel css
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import axios from 'axios';
// import $ from 'jquery';
export default function SellForm({ setIsSale }) {
  const [imgState, setImgState] = useState([]);

  const userLocation = useSelector((state) => state.location.userLocation);
  const petSelectRef = useRef();
  const categorySelectRef = useRef();
  const formInfoRef = useRef();
  const imgRef = useRef();
  function onCompleteBtn() {
    console.log('판매 글쓰기 완료 버튼 눌림');
    console.log('imgLists', imgRef.current.files);
    const form = formInfoRef.current;
    const datas = {
      title: form.title.value,
      price: form.price.value,
      content: form.content.value,
      category: categorySelectRef.current.value,
      usePet: petSelectRef.current.value,
      deal: true,
      userId: '임시아이디',
      location:
        userLocation.region_2depth_name + ' ' + userLocation.region_3depth_name,
    };
    console.log('판매 폼 데이터 :', datas);
    // axios
    //   .post('/sellPage/sellForm', {
    //     datas,
    //   })
    //   .then((response) => {});
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // 미리보기 기능
  const saveImgFile = () => {
    const imgLists = imgRef.current.files;
    let imageUrlLists = [...imgState];
    if (imgLists.length < 5) {
      for (let i = 0; i < imgLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imgLists[i]);
        imageUrlLists.push(currentImageUrl);
      }
      setImgState(imageUrlLists);
    } else {
      alert('4개 까지만 등록 가능');
    }
  };
  // 반려동물 번호 로 정보 요청 > name 값 가져오기
  let petData = [{ name: '보리' }, { name: '수남' }, { name: '밤이' }];

  function onImgUpload() {
    console.log('판매 폼 이미지 업로드 버튼 눌림');
    // 업로드 버튼 다시 눌렀을때 미리보기 날림
    setImgState([]);
  }
  return (
    <>
      {/* 판매글 폼 */}
      <form className={styles.sellForm} ref={formInfoRef}>
        {/* 클릭시 이미지 업로드 */}
        <div className={`${styles.sellImges} ${styles.marginBottom}`}>
          {/* {imgState && (
            <img
              src={imgState}
              alt="미리보기 이미지"
              className={`${styles.sellImges} ${styles.marginBottom}`}
            />
          )} */}
          {/* <label
            className={styles.imgLabel}
            onClick={() => {
              onImgUpload();
            }}
            htmlFor="inputFile"
          >
            +
          </label> */}
          <div>
            <Slider {...settings}>
              {imgState.map((images, index) => {
                return (
                  <img
                    key={index}
                    src={images}
                    alt={`${images}-${index}`}
                    className={`${styles.sellImges} ${styles.marginBottom}`}
                  ></img>
                );
              })}
            </Slider>
          </div>
          {/* 
​
            <div>
              {imgState && (
                <img
                  src={imgState}
                  alt="미리보기 이미지"
                  className={`${styles.sellImges} ${styles.marginBottom}`}
                />
              )}
            </div>
 */}
          <label
            className={styles.imgLabel}
            onClick={() => {
              onImgUpload();
            }}
            htmlFor="inputFile"
          ></label>
          <input
            type="file"
            id="inputFile"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={saveImgFile}
            ref={imgRef}
            multiple
          />
        </div>
        {/* 제목, 가격 input */}
        <div className={styles.marginBottom}>
          <p className={styles.formSubTitle}>제목</p>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
            required
          />
        </div>
        <div className={styles.marginBottom}>
          <p className={styles.formSubTitle}>가격</p>
          <input
            type="text"
            name="price"
            placeholder="가격을 입력해주세요"
            required
          />
        </div>
        {/* 선택 selectBox */}
        <label htmlFor="category">카테고리</label>
        <select
          name="sellFormCategory"
          ref={categorySelectRef}
          className={`${styles.selcet} ${styles.marginBottom}`}
        >
          <option value="feed">사료</option>
          <option value="snak">간식</option>
          <option value="supplies">용품</option>
        </select>
        <label htmlFor="petSellcet">반려동물 선택</label>
        <select
          name="sellFormPetSellect"
          ref={petSelectRef}
          className={`${styles.selcet} ${styles.marginBottom}`}
        >
          {petData.map((pet, index) => {
            return (
              <option key={index} value={pet.name}>
                {pet.name}
              </option>
            );
          })}
        </select>
        <p className={styles.marginBottom}>설명</p>
        <textarea
          name="content"
          placeholder="내용을 입력해 주세요."
          required
        ></textarea>
        {/* 취소 완료 버튼 */}
        <div className={`${styles.submitButton} ${styles.marginBottom}`}>
          <button
            onClick={() => {
              setIsSale(false);
            }}
          >
            취소
          </button>
          <button
            onClick={() => {
              onCompleteBtn();
            }}
          >
            완료
          </button>
        </div>
      </form>
    </>
  );
}
