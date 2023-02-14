import React from 'react';
import styles from '../css/sellPage/Card.module.css';
import LikeButton from './LikeButton';

const Card = ({ list }) => {
  console.log({ list });
  return (
    <>
      <div className={styles.card}>
        <img
          src={list.cardImg}
          aria-label="cardImg"
          loading="lazy"
          alt="카드 이미지"
        />
        <div className={styles.cardStateContainer}>
          <div className={styles.cardState}></div>
          <span>판매 완료</span>
        </div>
        <div className={styles.cardFooter}>
          <h3>{list.title}</h3>
          <p>{list.price} 원</p>
          <p>위치: {list.location}</p>
          <LikeButton />
        </div>
      </div>
    </>
  );
};

export default Card;
