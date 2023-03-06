import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './css/CustomCardSlider.module.css';
import NoContentNotice from '../assets/NoContentNotice.jpg';

import Card from './Card';

export const StyledSlider = styled(Slider)`
  height: 350px; //슬라이드 컨테이너 영역
  .slick-list {
    //슬라이드 스크린
    width: 50vw;
    height: 100%;
    margin: 0;
    overflow-x: hidden;
    margin-top: 30px;
  }
  .slick-slide {
    width: calc(70vw / 3);
    display: flex;
    align-items: center;
  }
  .slick-dots {
    //슬라이드의 위치
    margin-top: 70px;
  }
  .slick-track {
    //이건 잘 모르겠음
    width: 100%;
    height: 100%;
  }
  .slick-prev:before,
  .slick-next:before {
    color: black;
    left: -45px;
  }

  .slick-next:before {
    color: black;
    right: -45px;
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 25px;
  }

  .slick-next {
    right: -35px;
  }

  @media screen and (max-width: 2200px) {
    .slick-list {
      //슬라이드 스크린
      width: 70vw;
    }
  }

  @media screen and (max-width: 1500px) {
    .slick-list {
      width: 65vw;
    }
    .slick-slide {
      width: calc(65vw / 3);
    }
  }

  @media screen and (max-width: 1200px) {
    .slick-slide {
      width: 300px !important;
    }
    .slick-next {
    }
  }
`;

const CustomSlider = ({ datas }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div>
      {datas.length == '' ? (
        <img className={styles.NoContentNotice} src={NoContentNotice} alt="" />
      ) : (
        <StyledSlider {...settings} className={styles.slider}>
          {datas.map((data) => (
            <Card key={data.id} list={data} />
          ))}
        </StyledSlider>
      )}
    </div>
  );
};

export default CustomSlider;
