import React from 'react';
import styles from '../css/sellPage/SellForm.module.css';

export default function SellForm({ setIsSale }) {
  return (
    <>
      {/* 판매글 폼 */}
      <form className={styles.sellForm}>
        {/* 클릭시 이미지 업로드 */}
        <div className={`${styles.sellImges} ${styles.marginBottom}`}>
          <div>+</div>
        </div>

        {/* 제목, 가격 input */}
        <div className={styles.marginBottom}>
          <p className={styles.formSubTitle}>제목</p>
          <input type="text" placeholder="제목을 입력해주세요" />
        </div>
        <div className={styles.marginBottom}>
          <p className={styles.formSubTitle}>가격</p>
          <input type="text" placeholder="가격을 입력해주세요" />
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
          className={`${styles.selcet} ${styles.marginBottom}`}
        >
          <option value="supplies" selected>
            보리
          </option>
          <option value="feed">수남</option>
        </select>

        <p className={styles.marginBottom}>설명</p>
        <textarea placeholder="내용을 입력해 주세요."></textarea>

        {/* 취소 완료 버튼 */}
        <div className={`${styles.submitButton} ${styles.marginBottom}`}>
          <button
            onClick={() => {
              setIsSale(false);
            }}
          >
            취소
          </button>
          <button onClick={() => {}}>완료</button>
        </div>
      </form>
    </>
  );
}
