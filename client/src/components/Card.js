import React, { useState, useEffect } from 'react';

import styles from './css/Card.module.css';

import noneLike from '../assets/NoneClikeLikeButton.png';
import clickedLike from '../assets/ClikedLikeButton.png';

import axios from 'axios';

// 용품 PK 아이디 조회
// axios.get('/getLikeCount').then((res) => {
//   console.log(res);
// });

const Card = (list) => {
  // likeState 눌렸는지 여부 > likeStateImg 이미지 변경
  const [likeState, setLikeState] = useState(false);
  const [likeStateImg, setLikeStateImg] = useState(noneLike);
  const [likeCount, setLikeCount] = useState(0);

  // 찜 on / off
  const onLikeButton = () => {
    if (likeState === false) {
      //찜 안된 상태
      alert('찜을 하시겠습니까?');
      setLikeStateImg(clickedLike);
      setLikeCount(likeCount + 1);
    } else {
      // 찜한 상태
      alert('찜을 해제 하시겠습니까?');
      setLikeStateImg(noneLike);
      setLikeCount(likeCount - 1);
    }
  };

  // console.log('list', list);
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
        </div>
        <div className={styles.likeButton}>
          <div className={styles.likeCount}>{likeCount}</div>
          <img
            src={likeStateImg}
            alt="찜"
            onClick={() => {
              onLikeButton(setLikeState(!likeState));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
