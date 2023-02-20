import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './css/Card.module.css';

import noneLike from '../assets/NoneClikeLikeButton.png';
import clickedLike from '../assets/ClikedLikeButton.png';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = (list) => {
  // likeState 눌렸는지 여부 > likeStateImg 이미지 변경
  const [likeState, setLikeState] = useState(list.list.deal);
  const [likeStateImg, setLikeStateImg] = useState(noneLike);
  const [likeCount, setLikeCount] = useState(list.list.likeCount);

  const navigate = useNavigate();

  //  const userLocation = useSelector((state) => state.location.userLocation);
  // const location =
  //   userLocation.region_2depth_name + ' ' + userLocation.region_3depth_name;

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
      return;
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
      return;
    }
  };
  // 카드 컴포넌트 클릭 함수
  const goToDetail = () => {
    navigate('/salesFost', { state: { ...list.list } });
    console.log('카드 클릭 해당 글 상세페이지 이동 정보:', { ...list.list });
  };
  // console.log('판매 글 list', list);

  const listData = list.list;
  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          goToDetail(this);
        }}
      >
        <img
          src={`/uploadImg/${listData.cover}`}
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
      {/* <Link to={`/postView/${list.list.id}`}>{list.list.title}</Link> */}
    </>
  );
};

export default Card;
