import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './css/MainPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import { setPets } from '../store/module/pets';

import PuppyMainImg from '../assets/PuppyMainImg.png';
import CatMainImg from '../assets/CatMainImg.png';
import BasicMainImg from '../assets/BasicMainImg.png';
import SellMainImg from '../assets/SellMainImg.png';
import LocationMainImg from '../assets/LocationMainImg.png';
import UpIcon from '../assets/UpIcon.png';
import Card from '../components/Card';
import MainModal from '../components/MainModal';
import MainModalImg from '../assets/MainModal.jpg';

import axios from 'axios';

const MainPage = () => {
  const [Hot, setHot] = useState([]);
  const isLoggedIn = sessionStorage.getItem('userId');

  const [havePop, setHavePop] = useState(false);
  const btnState = useSelector((state) => state.typeSwitch.switchState);
  const userLocation = useSelector((state) => state.location.userLocation);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getPopularPost();
    openModal();
    getPopularPost();
  }, []);

  /**인기글 가져오는 함수 */
  const getPopularPost = () => {
    axios
      .get('supplies/getData', {
        params: {
          type: 'basic',
          location: 'location',
        },
      })
      .then((res) => {
        if (res.length === 0) {
        } else {
          setHavePop(true);
        }
        let temp = [];

        res.data.sort((a, b) => {
          if (a.likeCount > b.likeCount) return -1;
          if (a.likeCount < b.likeCount) return 1;
          return 0;
        });

        for (let i = 0; i < 4; i++) {
          temp.push(res.data[i]);
        }
        setHot(temp);
      });
  };

  /**펫정보가져오기*/
  const getpetIds = () => {
    axios
      .get('kakao/getPetId', {
        params: {
          userId: isLoggedIn,
        },
      })
      .then((res) => {
        /*백에서 불러온 펫 데이터*/
        console.log('데이터', res.data);
        dispatch(setPets(res.data));
        sessionStorage.setItem('pet', res.data);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      getpetIds();
    }
  }, []);

  const moveSellPage = () => {
    navigate('/sellPage');
  };

  const onClickGoUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Nav />
      <div className={styles.mainPage}>
        {/*첫번째 메인페이지*/}
        <section>
          <Category />
          <div className={styles.mainImg}>
            {btnState === 'basic' ? <img src={BasicMainImg} alt="basic" /> : ''}
            {btnState === 'puppy' ? <img src={PuppyMainImg} alt="puppy" /> : ''}
            {btnState === 'cat' ? <img src={CatMainImg} alt="cat" /> : ''}
          </div>
        </section>
        {/*두번째 메인페이지*/}
        <section>
          <img src={SellMainImg} alt="" className={styles.sellImg} />
          <div>
            <h1>
              반려동물
              <br />
              중고용품 거래 공간
            </h1>
            <h3>
              우리 강아지가 쓰지 않는 물건을
              <br />
              버리지말고 이웃에게 판매해보세요.
            </h3>
          </div>
        </section>
        {/*세번째 메인페이지*/}
        <section>
          <img src={LocationMainImg} className={styles.locationImg} alt="" />
          <div>
            <h1>
              내 근처에서
              <br />
              쉽게 거래할 수 있는 공간
            </h1>
            <h3>
              멀리가지 말고 내 근처에 있는
              <br />
              이웃에게 구매하거나 판매해보세요
            </h3>
          </div>
        </section>
        {/*마지막 메인페이지*/}
        <section>
          <h1>인기글</h1>
          <div className={styles.cards}>
            <div>
              {havePop ? (
                <>
                  {Hot.map((hot, index) => {
                    return <Card key={index} list={hot} />;
                  })}
                </>
              ) : (
                <>인기글이 없습니다</>
              )}
            </div>
          </div>

          <span onClick={moveSellPage}>더보기</span>
        </section>
        <img src={UpIcon} alt="" onClick={onClickGoUp} id={styles.goUpIcon} />
      </div>

      <MainModal
        open={modalOpen}
        close={closeModal}
        header="bandari에 어서오세요 집사님!"
      >
        <img src={MainModalImg} alt="" className={styles.modalImg} />
      </MainModal>
    </>
  );
};

export default MainPage;
