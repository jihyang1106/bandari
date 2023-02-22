import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './css/Card.module.css';

import noneLike from '../assets/NoneClikeLikeButton.png';
import clickedLike from '../assets/ClikedLikeButton.png';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = ({ list }) => {
  // 개인 좋아요
  const [likeState, setLikeState] = useState(false);
  // 총 좋아요
  const [likeCount, setLikeCount] = useState(list.picks.length);
  // sold out 여부
  const [deal, setDeal] = useState('');

  const isLoggedIn = useSelector((state) => state.user.user.isLogin);
  const userId = useSelector((state) => state.user.user.userId);
  const navigate = useNavigate();

  useEffect(() => {
    //거래중
    if (list.deal) {
      setDeal('selling');
    } else {
      //거래완료
    }
  }, [list.deal]);

  useEffect(() => {
    if (!isLoggedIn) return false;
    const datas = list.picks.filter((data) => data.userId === isLoggedIn);
    console.log('datas : ', datas);
    if (datas.length > 0) setLikeState(true);
  }, []);
  // console.log('용품글 아이디: ', list.id);

  // 찜 버튼
  const onLikeButton = (e) => {
    if (!isLoggedIn) {
      alert('로그인 하셔야 이용이 가능합니다.');
      return;
    }
    if (!likeState) {
      //찜 안된 상태

      if (window.confirm('찜을 하시겠습니까?')) {
        axios
          .post('pick/postLikePlus', {
            id: list.id,
            userId: isLoggedIn,
          })
          .then((res) => {
            setLikeCount(likeCount + 1);
            setLikeState(true);
            if (res.data === true) console.log('좋아요 성공');
          });
      }
    } else {
      // 찜한 상태
      if (window.confirm('찜을 해제 하시겠습니까?')) {
        axios
          .post('pick/postLikeminus', {
            id: list.id,
            userId: isLoggedIn,
          })
          .then((res) => {
            setLikeCount(likeCount - 1);
            setLikeState(false);
            if (res.data === true) console.log('좋아요 해제 성공');
          });
      }
    }
  };

  // 카드 컴포넌트 클릭 함수
  const goToDetail = () => {
    navigate('/salesDetail', { state: { ...list } });
    console.log('카드 클릭 해당 글 상세페이지 이동 정보:', { ...list });
  };

  const listData = list;
  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          goToDetail();
        }}
      >
        <div className={`${styles[`${deal}`]}`}>
          {list.deal ? '' : 'Soldout'}
        </div>
        <img
          src={`/uploadImg/${listData.cover}`}
          aria-label="cardImg"
          loading="lazy"
          alt="카드 이미지"
        />

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
          <span className={styles.likeCount}>{likeCount}</span>
          <img
            src={likeState ? clickedLike : noneLike}
            alt="찜"
            onClick={(e) => {
              e.stopPropagation();
              onLikeButton(setLikeState(!likeState));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
