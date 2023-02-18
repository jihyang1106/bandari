import styles from './css/PetProfile.module.css';
// import styles from './css/PetProfile.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';

import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import $ from 'jquery';

const PetProfile = () => {
  const [imgState, setImgState] = useState([]);

  const navigate = useNavigate();
  const imgRef = useRef();
  const formInfoRef = useRef();
  const categorySelectRef = useRef();

  // 이미지 미리보기 기능
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgState(reader.result);
    };
  };

  async function onCompleteBtn() {
    const form = formInfoRef.current;
    const formData = new FormData();

    // 데이터
    const datas = {
      name: form.name.value,
      gender: form.gender.value,
      age: `${form.yy.value}년${form.mm.value}월${form.dd.value}일생`,
      weight: form.weight.value,
      petType: form.type.value,
      petSpeices: form.kind.value,
      content: form.content.value,
      info: form.content.value,
      userId: 'test@naver.com',
    };
    formData.append('datas', JSON.stringify(datas));
    // 이미지
    formData.append('petImg', imgRef.current.files[0]);

    for (var value of formData.values()) {
      console.log('form.data value', value);
    }

    await axios
      .post('pet/insert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('res.data', res.data);
      });
    // await axios
    //   .post('pet/insert', {
    //     data: formData,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  }

  function onImgUpload() {
    console.log('판매 폼 이미지 업로드 버튼 눌림');
    // 업로드 버튼 다시 눌렀을때 미리보기 날림
    setImgState([]);
  }
  // 취소 버튼
  function onResetPage() {
    navigate('/');
  }
  $(document).ready(function () {
    var now = new Date();
    var year = now.getFullYear();
    var mon =
      now.getMonth() + 1 > 9
        ? '' + (now.getMonth() + 1)
        : '0' + (now.getMonth() + 1);
    var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();
    //년도 selectbox만들기
    for (var i = 2000; i <= year; i++) {
      $('#year').append('<option value="' + i + '">' + i + '년</option>');
    }

    // 월별 selectbox 만들기
    for (var i = 1; i <= 12; i++) {
      var mm = i > 9 ? i : '0' + i;
      $('#month').append('<option value="' + mm + '">' + mm + '월</option>');
    }

    // 일별 selectbox 만들기
    for (var i = 1; i <= 31; i++) {
      var dd = i > 9 ? i : '0' + i;
      $('#day').append('<option value="' + dd + '">' + dd + '일</option>');
    }
    $('#year  > option[value=' + year + ']').attr('selected', 'true');
    $('#month  > option[value=' + mon + ']').attr('selected', 'true');
    $('#day  > option[value=' + day + ']').attr('selected', 'true');
  });

  return (
    <>
      <Nav />
      <div className={styles.petProfile}>
        <section>
          <Category />
          <form
            className={styles.petProfileForm}
            ref={formInfoRef}
            encType="multipart/form-data"
          >
            {/* 업로드 된 이미지 미리보기 슬라이드 */}
            <div className={`${styles.petImg} ${styles.marginBottom}`}>
              {imgState && (
                <img
                  src={imgState}
                  alt="미리보기 이미지"
                  className={`${styles.petImg} ${styles.marginBottom}`}
                />
              )}

              <label
                className={styles.imgLabel}
                onClick={onImgUpload}
                htmlFor="inputFile"
              >
                +
              </label>

              <input
                type="file"
                id="inputFile"
                name="petImg"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={saveImgFile}
                ref={imgRef}
              />
            </div>

            {/* 제목, 가격 input */}
            <div className={styles.marginBottom}>
              <p className={styles.formSubTitle}>이름</p>
              <input
                type="text"
                name="name"
                placeholder="이름을 입력해주세요"
                required
              />
            </div>

            <div className={styles.marginBottom}>
              <span className={styles.formSubTitle}>성별</span>
              <select
                className={`${styles.selcetBirth} ${styles.formSubTitle}`}
                ref={categorySelectRef}
                name="gender"
              >
                <option value="남아">남아</option>
                <option value="여아">여아</option>
              </select>
            </div>

            {/* 선택 selectBox */}
            <div>
              <label htmlFor="category" className={styles.formSubTitle}>
                나이
              </label>
              <select
                name="yy"
                id="year"
                ref={categorySelectRef}
                className={`${styles.selcetBirth} ${styles.marginBottom}`}
              ></select>

              <select
                name="mm"
                id="month"
                ref={categorySelectRef}
                className={`${styles.selcetBirth} ${styles.marginBottom}`}
              ></select>

              <select
                name="dd"
                id="day"
                ref={categorySelectRef}
                className={`${styles.selcetBirth} ${styles.marginBottom}`}
              ></select>
            </div>

            <label
              htmlFor="category"
              className={`${styles.formSubTitle} ${styles.marginBottom}`}
            >
              분류
            </label>
            <select
              name="type"
              ref={categorySelectRef}
              className={`${styles.selcet} ${styles.marginBottom}`}
            >
              <option value="강아지">강아지</option>
              <option value="고양이">고양이</option>
            </select>

            <div className={styles.marginBottom}>
              <span className={`${styles.formSubTitle}`}>견.묘종</span>
              <input
                type="text"
                name="kind"
                placeholder="예) 세상에 하나뿐인 믹스"
                required
              />
            </div>

            <label
              htmlFor="category"
              className={`${styles.formSubTitle} ${styles.marginBottom}`}
            >
              몸무게
            </label>
            <select
              name="weight"
              ref={categorySelectRef}
              className={`${styles.selcet} ${styles.marginBottom}`}
            >
              <option value="1 - 3 kg"> 1 - 3 kg </option>
              <option value="4 - 7 kg"> 4 - 7 kg </option>
              <option value="8 - 11 kg"> 8 - 11 kg </option>
              <option value="12 - 14 kg"> 12 - 14 kg </option>
              <option value="15 - 18 kg"> 15 - 18 kg </option>
              <option value="19 kg 이상"> 19 kg 이상 </option>
            </select>

            <p className={`${styles.marginRight} ${styles.block}`}>설명</p>
            <textarea
              name="content"
              placeholder="내용을 입력해 주세요."
              required
            ></textarea>
            {/* 취소 완료 버튼 */}
            <div className={`${styles.submitButton} ${styles.marginBottom}`}>
              <button onClick={onResetPage}>취소</button>
              <button onClick={onCompleteBtn}>완료</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default PetProfile;
