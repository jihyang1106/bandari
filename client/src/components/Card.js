import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './css/Card.module.css';

import noneLike from '../assets/NoneClickLikeButton.png';
import clickedLike from '../assets/ClickedLikeButton.png';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = ({ list }) => {
  // 개인 좋아요
  const [likeState, setLikeState] = useState(false);
  // 총 좋아요
  const [likeCount, setLikeCount] = useState();
  // sold out 여부
  const [deal, setDeal] = useState('');

  const isLoggedIn = useSelector((state) => state.user.user.isLogin);

  const navigate = useNavigate();

  useEffect(() => {
    //거래중
    if (list.deal) {
      setDeal('selling');
    } else {
      //거래완료
      setDeal('soldout');
    }
  }, [list.deal]);

  /**좋아요 초기화 부분 */
  useEffect(() => {
    if (!isLoggedIn) return false;
    const datas = list.picks.filter((data) => data.userId === isLoggedIn);
    console.log('datas : ', datas);
    if (datas.length > 0) setLikeState(true);
  }, []);

  /**좋아요 개수 초기화 부분 */
  useEffect(() => {
    axios
      .get('supplies/getLikeCount', {
        params: {
          id: list.id,
        },
      })
      .then((res) => {
        console.log(res.data.likeCount);
        setLikeCount(res.data.likeCount);
      });
  }, [likeState]);

  // 찜 버튼
  const onLikeButton = (e) => {
    if (!isLoggedIn) {
      alert('로그인 하셔야 이용이 가능합니다.');
      return;
    }
    if (!likeState) {
      if (window.confirm('찜을 하시겠습니까?')) {
        axios
          .post('pick/postLikePlus', {
            id: list.id,
            userId: isLoggedIn,
            likeCount,
          })
          .then((res) => {
            setLikeCount((prev) => prev + 1);
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
            likeCount,
          })
          .then((res) => {
            setLikeCount((prev) => prev - 1);
            setLikeState(false);
            console.log(res.data);
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
              onLikeButton();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
