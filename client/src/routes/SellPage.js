import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GetLocation from '../components/js/GetLocation';
import styled from 'styled-components';

import styles from './css/SellPage.module.css';
// 페이지네이션
import Paging from '../components/Paging';
//슬라이드
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import Card from '../components/Card';
import SellCategory from '../components/SellCategory';
import Dogbanner from '../assets/DogImgBanner.jpg';
import Catbanner from '../assets/CatImgBanner.jpg';

import axios from 'axios';

export const StyledSlider = styled(Slider)`
  .slick-slide img {
    width: 85% !important;
  }
`;

const SellPage = () => {
  const sellState = useSelector(
    (state) => state.sellCategorySwitch.switchState
  );

  const idxBtnState = useSelector((state) => state.typeSwitch.switchState);
  const userLocation = useSelector((state) => state.location.userLocation);

  const [all, setAll] = useState([]); // 전체 목록을 항상 가지고 있는 state -> 처음에 세팅되면 바뀔 일이 없어요
  const [sell, setSell] = useState([]); // 화면에 보여지는 state ( 전체, 사료 이런 거상관없이 클라이언트가 보고 있는 화면의 목록)

  //페이지네이션
  const [products, setProducts] = useState([]); // 리스트에 나타낼 아이템들
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(8); // 한 페이지에 보여질 아이템 수
  // const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  // const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

  const [getAll, setGetAll] = useState(true); //초반에는 전체글, 버튼클릭시 위치로 가져오며 false된다

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // slick-carousel settings
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // sellState 카테고리 변경 json
  const state = {
    peed: '사료',
    snack: '간식',
    product: '용품',
  };

  useEffect(() => {
    // 처음 basic이 들어오면 전체라는 거니까 전체 정보를 갖고 있는 all

    let arr = [];
    if (sellState === 'basic') {
      arr = all;
    } else {
      // 전체에서 filter을 걸어야 하잖아요.
      // 현재 sell은 이미 다른 filter가 걸려있는 친구. ( all에서 filter을 진행)
      // 이때 filter을 하는 조건이 all 리스트에 들어있는 친구들의 category가 내가 누른 btnState에 맞는 한글이어야 해요.
      // 이걸 하나씩 if문으로 하는 게 아니라 위에 json 형태로 만들어놓고 btnState 즉, 영어로 들어온 값이 맞춰서 검색을 하는 거지

      arr = all.filter((data) => data.category == state[sellState]);
      // setCurrentPosts([...newArray]);
    }

    // const indexLast = 1 * postPerPage;
    setProducts([...arr]);
    // setCount([...arr].length);
    // setIndexOfLastPost(indexLast);
    // setIndexOfFirstPost(indexLast - postPerPage);
    // setCurrentPosts([...arr].slice(indexLast - postPerPage, indexLast));
  }, [sellState]);

  useEffect(() => {
    // setCurrentPage(1);
    const indexLast = currentPage * postPerPage;
    // setProducts([...products]);
    setCount([...products].length);
    // setIndexOfLastPost(indexLast);
    // setIndexOfFirstPost(indexLast - postPerPage);
    setCurrentPosts([...products].slice(indexLast - postPerPage, indexLast));
  }, [currentPage, products, postPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  useEffect(() => {
    getAllData();
  }, [idxBtnState]);
  /*전체판매글 가져오는 함수* */
  const getAllData = async () => {
    axios
      .get('supplies/getData', {
        params: {
          type: idxBtnState,
          location: 'location',
        },
      })
      .then((res) => {
        setSell(res.data);
        setAll(res.data);
        setProducts(res.data);
      });
  };

  /**위치값에 따른 글 가져오기 */
  const getLocationData = async () => {
    if (idxBtnState === 'puppy') {
      axios
        .get('supplies/getData', {
          params: {
            type: idxBtnState,
            location: userLocation,
          },
        })
        .then((res) => {
          setSell(res.data);
          setAll(res.data);
          setProducts(res.data);
        });
    } else if (idxBtnState === 'cat') {
      axios
        .get('supplies/getData', {
          params: {
            type: idxBtnState,
            location: userLocation,
          },
        })
        .then((res) => {
          setSell(res.data);
          setAll(res.data);
          setProducts(res.data);
        });
    } else {
      axios
        .get('supplies/getData', {
          params: {
            type: idxBtnState,
            location: userLocation,
          },
        })
        .then((res) => {
          setSell(res.data);
          setAll(res.data);

          // const indexLast = currentPage * postPerPage;
          setProducts(res.data);
          // setCount(res.data.length);
          // setIndexOfLastPost(indexLast);
          // setIndexOfFirstPost(indexLast - postPerPage);
          // setCurrentPosts(res.data.slice(indexLast - postPerPage, indexLast));
        });
    }
  };

  useEffect(() => {
    if (getAll) {
      getAllData();
    } else {
      getLocationData();
    }
  }, [getAll]);

  // 페이지네이션 페이지 조정
  const setPage = (pageNum) => {
    setCurrentPage(pageNum);
    // const indexLast = pageNum * postPerPage;
    // // setIndexOfLastPost(indexLast);
    // // setIndexOfFirstPost(indexLast - postPerPage);
    // setCurrentPosts(products.slice(indexLast - postPerPage, indexLast));
  };

  const setPagination = (postNum) => {
    setCurrentPage(postNum - 1);
    setCount(postNum);
  };

  return (
    <>
      <Nav />
      <div className={styles.sellPage}>
        <section>
          <Category />
          <div className={styles.AvailSaleContainer}>
            <SellCategory
              getAll={getAll}
              setGetAll={setGetAll}
              setProducts={setProducts}
              setPagination={setPagination}
            />
            <div className={styles.cardContainer}>
              <div className={styles.BannerImg}>
                <StyledSlider {...settings}>
                  <img src={Dogbanner} alt="배너" />
                  <img src={Catbanner} alt="배너" />
                </StyledSlider>
              </div>

              {currentPosts && products.length > 0 ? (
                <>
                  {currentPosts.map((list, index) => {
                    return <Card key={index} list={list} />;
                  })}
                </>
              ) : (
                <div>로딩중...</div>
              )}
            </div>
            <div className={styles.pagings}>
              <Paging page={currentPage} count={count} setPage={setPage} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SellPage;
