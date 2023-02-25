import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PetCard from './PetCard';

export const StyledSlider = styled(Slider)`
  height: 200px; //슬라이드 컨테이너 영역
  .slick-list {
    //슬라이드 스크린
    width: 1000px;
    height: 100%;
    margin: 0;
    overflow-x: hidden;
  }
  .slick-slide {
    //각 슬라이드
    width: 470px !important;
    display: flex;
    align-items: center;
  }
  .slick-dots {
    //슬라이드의 점 위치
    margin-top: 70px;
  }
  .slick-track {
    //전체 트랙
    width: 100%;
    height: 100%;
  }
  .slick-prev:before,
  .slick-next:before {
    display: none;
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

  @media screen and (max-width: 1500px) {
    .slick-list {
      width: 700px;
    }

    .slick-slide {
      //각 슬라이드
      width: 330px !important;
    }
  }

  @media screen and (max-width: 1200px) {
    .slick-list {
      width: 625px;
    }
  }

  @media screen and (max-width: 1000px) {
    .slick-list {
      width: 50vw;
    }

    .slick-slide {
      //각 슬라이드
      width: 330px !important;
    }
  }

  @media screen and (max-width: 750px) {
    .slick-slide {
      //각 슬라이드
      width: 250px !important;
    }
  }
`;

const CustomSlider = ({ petdatas }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
    <StyledSlider {...settings}>
      {petdatas !== undefined ? (
        petdatas.map((data) => <PetCard pet={data} />)
      ) : (
        <div>...</div>
      )}
    </StyledSlider>
  );
};

export default CustomSlider;
