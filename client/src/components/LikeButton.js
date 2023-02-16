import React, { useState } from 'react';
import styles from './css/LikeButton.module.css';
import noneLike from '../assets/NoneClikeLikeButton.png';
import clickedLike from '../assets/ClikedLikeButton.png';

export default function LikeButton() {
  const [likeState, setLikeState] = useState(false);
  const [likeStateImg, setLikeStateImg] = useState(noneLike);

  const onLikeButton = () => {
    if (likeState === false) {
      //찜 안된 상태
      alert('찜을 하시겠습니까?');
      setLikeStateImg(clickedLike);
    } else {
      // 찜한 상태
      alert('찜을 해제 하시겠습니까?');
      setLikeStateImg(noneLike);
    }
  };

  return (
    <div className={styles.likeButton}>
      <img
        src={likeStateImg}
        alt="찜"
        onClick={() => {
          onLikeButton(setLikeState(!likeState));
        }}
      />
    </div>
  );
}
