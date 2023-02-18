import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
  const [likeState, setLikeState] = useState(list.list.deal);
  const [likeStateImg, setLikeStateImg] = useState(noneLike);
  const [likeCount, setLikeCount] = useState(list.list.likeCount);

  //  const userLocation = useSelector((state) => state.location.userLocation);
  // const location =
  //   userLocation.region_2depth_name + ' ' + userLocation.region_3depth_name;

  // 찜 on / off
  const onLikeButton = () => {
    if (list.list.deal === false) {
      //찜 안된 상태
      alert('찜을 하시겠습니까?');
      setLikeStateImg(clickedLike);
      setLikeCount(list.list.likeCount + 1);
      list.list.deal = true;

      axios
        .post('supplies/postLikePlus', {
          id: list.list.id,
          likeCount: likeCount + 1,
          deal: list.list.deal,
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      // 찜한 상태
      alert('찜을 해제 하시겠습니까?');
      setLikeStateImg(noneLike);
      setLikeCount(list.list.likeCount);
      list.list.deal = false;
      axios
        .post('supplies/postLikeminus', {
          id: list.list.id,
          likeCount: likeCount - 1,
          deal: list.list.deal,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  // console.log('판매 글 list', list);
  // console.log('판매 글 list.list.likeCount', list.list.likeCount);
  // console.log('likeCount : ', { likeCount });
  // console.log('likeState : ', { likeState });

  const listData = list.list;
  return (
    <>
      <div className={styles.card}>
        <img
          src={`/images/${listData.cover}`}
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
          <p>
            {/* {' '}
            {userLocation ? (
              <>
                {' '}
                {userLocation.region_2depth_name +
                  ' ' +
                  userLocation.region_3depth_name}
              </>
            ) : (
              <>전체</>
            )} */}
            {listData.location}
          </p>
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
