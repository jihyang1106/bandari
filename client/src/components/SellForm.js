import React, { useRef, useState } from 'react';
import styles from './css/SellForm.module.css';
import axios from 'axios';

export default function SellForm({ setIsSale }) {
  const checkSelectRef = useRef();
  const [img, setImg] = useState([]); // 커버 이미지
  // console.log(img);
  function onCompleteBtn() {
    console.log('판매 글쓰기 완료 버튼 눌림');
    // if (checkSelectRef.current.value === '') {
    //   alert('사용한 반려동물을 선택 해주세요~');
    //   checkSelectRef.current.focus();
    //   return;
    // }
  }

  // setCoverFile(e.target.files[0]);
  const uploadChange = (e) => {
    const arr = [...img, ...e.target.files];
    setImg(arr);
  };

  /**이미지 업로드 구현 */
  const onImgUpload = async () => {
    console.log(img);
    // const formData = new FormData();
    // formData.append('cover', cover);
    // await axios
    //   .post('/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };

  return (
    <>
      {/* 판매글 폼 */}
      <form className={styles.sellForm}>
        {/* 클릭시 이미지 업로드 */}
        {/* <div className={`${styles.sellImges} ${styles.marginBottom}`}>
          <div
            onClick={() => {
              onImgUpload();
            }}
          >
            +
          </div>
        </div> */}

        <div>
          <input type="file" name="img" onChange={uploadChange} multiple />
          <button onClick={onImgUpload}>업로드</button>
        </div>
        {/* 제목, 가격 input */}
        <div className={styles.marginBottom}>
          <p className={styles.formSubTitle}>제목</p>
          <input type="text" placeholder="제목을 입력해주세요" required />
        </div>
        <div className={styles.marginBottom}>
          <p className={styles.formSubTitle}>가격</p>
          <input type="text" placeholder="가격을 입력해주세요" required />
        </div>

        {/* 선택 selectBox */}
        <label for="category">카테고리</label>
        <select
          name="sellFormCategory"
          className={`${styles.selcet} ${styles.marginBottom}`}
        >
          <option value="feed">사료</option>
          <option value="snak">간식</option>
          <option value="supplies">용품</option>
        </select>

        <label for="petSellcet">반려동물 선택</label>
        <select
          name="sellFormPetSellect"
          ref={checkSelectRef}
          className={`${styles.selcet} ${styles.marginBottom}`}
        >
          <option value="supplies">보리</option>
          <option value="feed">수남</option>
        </select>

        <p className={styles.marginBottom}>설명</p>
        <textarea placeholder="내용을 입력해 주세요." required></textarea>

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
