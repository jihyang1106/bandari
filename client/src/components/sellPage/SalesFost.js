import React from 'react';
import styles from '../css/sellPage/SalesFost.module.css';

export default function SalesFost(props) {
  return (
    <>
      <form className={styles.sellForm}>
        {/* 업로드 이미지*/}
        <div className={`${styles.sellImges} ${styles.marginBottom}`}>
          <div></div>
        </div>

        {/* 제목, 가격 데이터 */}
        <div className={styles.marginBottom}>
          <p className={styles.formSubTitle}>작성자 : 누구님</p>
          <p className={styles.formSubTitle}>제목</p>
          <input type="text" value={props.title} />
        </div>
        <div className={styles.marginBottom}>
          <p className={styles.formSubTitle}>가격</p>
          <input type="text" value={props.price} />
        </div>

        {/* 선택된 반려동물 정보*/}
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
          <button className={styles.marginBottom}>연락하기</button>
        </div>
      </form>
    </>
  );
}
