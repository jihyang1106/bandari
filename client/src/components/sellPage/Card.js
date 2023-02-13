import React from 'react';
import styles from '../css/sellPage/Card.module.css';
import LikeButton from './LikeButton';

export default function Card(props) {
  return (
    <>
      <div className={styles.card}>
        <img
          src={props.cardImg}
          aria-label="cardImg"
          loading="lazy"
          alt="카드 이미지"
        />
        <div className={styles.cardStateContainer}>
          <div className={styles.cardState}></div>
          <span>판매 완료</span>
        </div>
        <div className={styles.cardFooter}>
          <h3>{props.title}</h3>
          <p>{props.price} 원</p>
          <p>위치: {props.location}</p>
          <LikeButton />
        </div>
      </div>
    </>
  );
}

//props.children
