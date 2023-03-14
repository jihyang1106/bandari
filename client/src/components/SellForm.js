import React, { useEffect, useRef, useState } from 'react';
import styles from './css/SellForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// slick-carousel css
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function SellForm() {
  const [imgState, setImgState] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLocation = useSelector((state) => state.location.userLocation);
  const userId = sessionStorage.getItem('userId');
  const petsidx = useSelector((state) => state.pets.pets);
  const petData = useSelector((state) => state.pets.pets);
  const [pets, setPets] = useState([]);
  const [petType, setpetType] = useState();

  const petSelectRef = useRef();
  const categorySelectRef = useRef();
  const formInfoRef = useRef();
  const imgRef = useRef();
  const priceRef = useRef();

  //처음에 불러와야할 pet정보
  useEffect(() => {
    axios
      .post('pet/checkPet', {
        userID: userId,
      })
      .then((res) => {
        setPets(res.data);
        setpetType(res.data.petType);
      });
  }, []);

  // slick-carousel settings
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  /** 이미지 미리보기 함수 */
  const saveImgFile = () => {
    const imgLists = imgRef.current.files;
    let imageUrlLists = [...imgState];
    if (imgLists.length < 5) {
      for (let i = 0; i < imgLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imgLists[i]);
        imageUrlLists.push(currentImageUrl);
      }
      setImgState(imageUrlLists);
    } else {
      alert('이미지는 최대 4개 까지 등록 가능합니다.');
    }
  };

  /**판매 글쓰기 완료 함수 */
  const onCompleteBtn = async () => {
    const form = formInfoRef.current;
    const formData = new FormData();

    const img = imgRef.current.files;
    // 파일
    for (var i = 0; i < img.length; i++) {
      formData.append(`img`, img[i]);
    }

    // 펫타입정의
    let petType = '';
    pets.forEach((el, idx) => {
      if (el.id + '' === petSelectRef.current.value) {
        petType = el.petType;
      }
    });

    //데이터
    const datas = {
      title: form.title.value,
      price: priceRef.current.value,
      content: form.content.value,
      location: `${userLocation.region_2depth_name} ${userLocation.region_3depth_name}`,
      category: categorySelectRef.current.value,
      petId: petSelectRef.current.value,
      userId: userId,
      petType: petType,
    };
    formData.append('datas', JSON.stringify(datas));

    await axios
      .post('supplies/insert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data) {
          alert('글 등록에 성공하셨습니다!');
        } else {
          alert('글 등록에 실패하였습니다!');
        }
      })
      .then(navigate('/SellPage'));
  };

  /**업로드 버튼 클릭 시 이전 값 초기화  */
  function onImgUpload() {
    setImgState([]); //
  }

  return (
    <>
      {/* 판매글 폼 */}
      <form
        className={styles.sellForm}
        ref={formInfoRef}
        encType="multipart/form-data"
      >
        {/* 업로드 된 이미지 미리보기 슬라이드 */}
        <div className={`${styles.sellImges} ${styles.marginBottom}`}>
          <div>
            <Slider {...settings}>
              {imgState.map((images, index) => {
                return (
                  <img
                    key={index}
                    src={images}
                    alt={`${images}-${index}`}
                    className={`${styles.sellImges} ${styles.marginBottom}`}
                  ></img>
                );
              })}
            </Slider>
          </div>

          {/* 클릭시 이미지 업로드 */}
          <label
            className={styles.imgLabel}
            onClick={() => {
              onImgUpload();
            }}
            htmlFor="inputFile"
          >
            +
          </label>
          <input
            type="file"
            id="inputFile"
            accept="image/*"
            name="img"
            style={{ display: 'none' }}
            onChange={saveImgFile}
            ref={imgRef}
            multiple
          />
        </div>
        {/* 제목, 가격 input */}
        <div className={styles.marginBottom}>
          <p className={styles.formSubTitle}>제목</p>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
            required
          />
        </div>
        <div className={styles.marginBottom}>
          <p className={styles.formSubTitle}>가격</p>
          <input
            type="number"
            name="price"
            placeholder="가격을 입력해주세요"
            step="1000"
            min="1000"
            // pattern="/[0-9]/"
            ref={priceRef}
            required
          />
        </div>
        {/* 선택 selectBox */}
        <label
          htmlFor="category"
          className={`${styles.formSubTitle} ${styles.marginRight}`}
        >
          카테고리
        </label>
        <select
          name="sellFormCategory"
          ref={categorySelectRef}
          className={`${styles.selcet} ${styles.marginBottom}`}
        >
          <option value="사료">사료</option>
          <option value="간식">간식</option>
          <option value="용품">용품</option>
        </select>
        <label
          htmlFor="petSellcet"
          className={`${styles.formSubTitle} ${styles.marginRight}`}
        >
          사용한 내 새꾸
        </label>
        <select
          name="sellFormPetSellect"
          ref={petSelectRef}
          className={`${styles.selcet} ${styles.marginBottom}`}
        >
          {petData.map((pet, index) => {
            return (
              <option key={index} value={pet.id}>
                {pet.name}
              </option>
            );
          })}
        </select>
        <p className={`${styles.formSubTitle} ${styles.marginRight}`}>설명</p>
        <textarea
          name="content"
          placeholder="내용을 입력해 주세요."
          required
        ></textarea>
        {/* 취소 완료 버튼 */}
        <div className={`${styles.submitButton}`}>
          <button
            onClick={() => {
              navigate('/sellPage');
            }}
          >
            취소
          </button>
          <button
            onClick={() => {
              onCompleteBtn();
            }}
          >
            완료
          </button>
        </div>
      </form>
    </>
  );
}
