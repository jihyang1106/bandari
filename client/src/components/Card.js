import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './css/Card.module.css';

import noneLike from '../assets/NoneClikeLikeButton.png';
import clickedLike from '../assets/ClikedLikeButton.png';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = (list, pickList) => {
  // 1. likeState => userId가 좋아요 누르면 > { pick }에 넣고 빼도록 한다.

  // {supplies의 pk}와 {user의 pk}가 일치하는 {pick}이 있으면,
  // 2. likeState 눌렸는지 여부 => pick데이터 조회값에 따라 => likeStateImg 이미지 변경
  // 3. likeStateImg => pick에 값이 있으면, 찜 상태 / 없으면 noneLike 이미지

  // 4. likeCount => 총 카운트는 pick 데이터 갯수
  const [likeState, setLikeState] = useState();
  const [deal, setDeal] = useState('');

  const [likeStateImg, setLikeStateImg] = useState(noneLike);
  const [likeCount, setLikeCount] = useState(list.list.likeCount);

  const [pick, setPick] = useState([]);
  const isLogin = useSelector((state) => state.user.user.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    setPick(pickList);
    // console.log(pickList);
  }, [pickList]);
  useEffect(() => {
    //거래중
    if (list.list.deal) {
      setDeal('selling');
    } else {
      //거래완료
      setDeal('soldout');
    }
  }, [list.list.deal]);

  //  const userLocation = useSelector((state) => state.location.userLocation);
  // const location =
  //   userLocation.region_2depth_name + ' ' + userLocation.region_3depth_name;
  // console.log(list.list);
  // 판매페이지 좋아요 버튼 상태값

  const onLikeButton = (e) => {
    // if (isLogin) {
    if (list.list.likeCount === 0) {
      //찜 안된 상태
      alert('찜을 하시겠습니까?');
      setLikeStateImg(clickedLike);
      setLikeCount(list.list.likeCount + 1);

      axios
        .post('supplies/postLikePlus', {
          id: list.list.id,
          likeCount: 1,
        })
        .then((res) => {
          console.log(res);
        });
      return;
    } else {
      if (list.list.likeCount === 1) {
        // 찜한 상태
        alert('찜을 해제 하시겠습니까?');
        setLikeStateImg(noneLike);
        setLikeCount(list.list.likeCount);

        axios
          .post('supplies/postLikeminus', {
            id: list.list.id,
            likeCount: 0,
          })
          .then((res) => {
            console.log(res);
          });
      }

      return;
    }
    // } else {
    //   alert('로그인 하셔야 이용이 가능합니다.');
    // }
  };
  // 카드 컴포넌트 클릭 함수
  const goToDetail = () => {
    navigate('/salesDetail', { state: { ...list.list } });
    console.log('카드 클릭 해당 글 상세페이지 이동 정보:', { ...list.list });
  };
  // console.log('판매 글 list', list);

  const listData = list.list;
  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          goToDetail();
        }}
      >
        <div className={`${styles[`${deal}`]}`}>
          {list.list.deal ? '' : 'Soldout'}
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
            src={likeStateImg}
            alt="찜"
            onClick={(e) => {
              e.stopPropagation();
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
