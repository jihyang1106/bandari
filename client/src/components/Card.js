import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './css/Card.module.css';

import noneLike from '../assets/NoneClikeLikeButton.png';
import clickedLike from '../assets/ClikedLikeButton.png';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = (list) => {
  // 1. likeState => userId가 좋아요 누르면 > { pick }에 넣고 빼도록 한다.

  // {supplies의 pk}와 {user의 pk}가 일치하는 {pick}이 있으면,
  // 2. likeState 눌렸는지 여부 => pick데이터 조회값에 따라 => likeStateImg 이미지 변경
  // 3. likeStateImg => pick에 값이 있으면, 찜 상태 / 없으면 noneLike 이미지

  // 4. likeCount => 총 카운트는 pick 데이터 갯수
  const [likeState, setLikeState] = useState('0');
  const [deal, setDeal] = useState('');

  const [pick, setPick] = useState([]);
  const [state, setState] = useState([]);

  const [likeStateImg, setLikeStateImg] = useState(noneLike);
  const [likeCount, setLikeCount] = useState(list.list.likeCount);

  const isLoggedIn = useSelector((state) => state.user.user.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    //거래중
    if (list.list.deal) {
      setDeal('selling');
    } else {
      //거래완료
      setDeal('soldout');
    }
  }, [list.list.deal]);

  console.log('이거 왜없냐:', isLoggedIn);

  useEffect(() => {
    if (isLoggedIn)
      // 조회 아이디 값으로 pick데이터 긁어옴
      axios.post('pick/getPick', { userId: 'ehs_11@naver.com' }).then((res) => {
        // console.log('해당 아이디 좋아요 데이터', res.data);
        setPick(res.data);
        res.data.map((el) => {
          setPick(el.suppliesId);
        });
        // const findIndex = res.data.findIndex((element) => element.suppliesId);
        console.log('setPickㅇㅇㅇㅇㅇ', pick);
      });
  }, []);

  // const set = new set(pick);
  // setState([...pick]);
  // const newArray = pick.filter((data) => data.userId && data.suppliesId )

  // 찜 버튼
  const onLikeButton = (e) => {
    if (isLoggedIn) {
      // !pick 수정해야====
      if (likeState) {
        //찜 안된 상태

        alert('찜을 하시겠습니까?');
        setLikeStateImg(clickedLike);
        setLikeCount(1);
        axios
          .post('pick/postLikePlus', {
            id: list.list.id,
            userId: 'ehs_11@naver.com',
          })
          .then((res) => {
            if (res.data === true) console.log('좋아요 성공');
          });
        return;
      } else {
        if (likeState !== 0) {
          // 찜한 상태
          alert('찜을 해제 하시겠습니까?');
          setLikeStateImg(noneLike);
          setLikeCount(0);
          axios
            .post('pick/postLikeminus', {
              id: list.list.id,
              userId: 'ehs_11@naver.com',
            })
            .then((res) => {
              if (res.data === true) console.log('좋아요 해제 성공');
            });
        }
        return;
      }
    } else {
      alert('로그인 하셔야 이용이 가능합니다.');
    }
    console.log('현재 선택된 카드', list.list);
  };

  // console.log('1번 list.list.id  상품 pk :', list.list.id);
  // console.log('2번 list.list.picks 찜 갯수:', list.list.picks);
  // useEffect(() => {
  //   var newArrPick = [list.list.picks];
  //   console.log('+++++++++++++++++찜 갯수:', list.list.picks);
  //   setPick([newArrPick]);
  //   console.log('픽값..', pick);
  // }, []);

  // const pickDatas = list.list.picks;
  // console.log('3번 pickDatas 찜 갯수:', pickDatas);

  // 카드 컴포넌트 클릭 함수
  const goToDetail = () => {
    navigate('/salesDetail', { state: { ...list.list } });
    console.log('카드 클릭 해당 글 상세페이지 이동 정보:', { ...list.list });
  };

  const listData = list.list;
  // console.log('list', list.list.picks);
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
