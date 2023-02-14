import React from 'react';
import styles from '../css/sellPage/Card.module.css';
import LikeButton from './LikeButton';

const Card = (list) => {
  console.log('list', list);
  const listData = list.list;
  return (
    <>
      <div className={styles.card}>
        <img
          src={`/images/${listData.cardImg}`}
          aria-label="cardImg"
          loading="lazy"
          alt="카드 이미지"
        />
        <div className={styles.cardStateContainer}>
          <div className={styles.cardState}></div>
          <span>판매 완료</span>
        </div>
        <div className={styles.cardFooter}>
          <h3>{listData.title}</h3>
          <p>{listData.price} 원</p>
          <p>위치: {listData.location}</p>
          <LikeButton />
        </div>
      </div>
    </>
  );
};

export default Card;
