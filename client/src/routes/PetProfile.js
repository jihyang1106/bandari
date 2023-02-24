import styles from './css/PetProfile.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import $ from 'jquery';
import { setPets } from '../store/module/pets';

const PetProfile = () => {
  const [imgState, setImgState] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imgRef = useRef();
  const formInfoRef = useRef();
  const genderRef = useRef();
  const yyRef = useRef();
  const mmRef = useRef();
  const ddRef = useRef();
  const typeRef = useRef();
  const kindRef = useRef();
  const weightRef = useRef();
  const userId = sessionStorage.getItem('userId');

  // 이미지 미리보기 함수
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
      info: form.content.value,
      userId: userId,
    };
    console.log('datas : ', datas);
    if (
      datas.name === '' ||
      datas.petSpeices === '' ||
      datas.info === '' ||
      imgRef.current.files[0] === undefined
    ) {
      alert('정보를 입력하시고, 이미지 등록해주세요!');
      return;
    }

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
        alert(` ${form.name.value}(이)의 소중한 정보가 등록되었습니다.`);
        dispatch(setPets(res.data.id));
        navigate('/');
      });
  }

  /** 업로드 버튼 클릭 시 이전 값 초기화  */
  function onImgUpload() {
    // 업로드 버튼 다시 눌렀을때 미리보기 날림
    setImgState([]);
  }

  // 취소 버튼
  function onResetPage() {
    navigate('/');
  }

  // 연, 월, 일 셀랙트 박스 값
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
            <div className={`${styles.petImg}`}>
              {imgState && (
                <img src={imgState} alt="" className={`${styles.petImg}`} />
              )}

              {/* 업로드 클릭 버튼 */}
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

            <div className={styles.petPrifDisplay}>
              <p className={styles.formSubTitle}>이름</p>
              <input
                className={styles.inputWidth}
                type="text"
                name="name"
                placeholder="이름을 입력해주세요"
                required
              />
            </div>

            <div className={styles.petPrifDisplay}>
              <p className={styles.formSubTitle}>성별</p>

              <select
                className={`${styles.selcet}`}
                ref={genderRef}
                name="gender"
              >
                <option value="남아">남아</option>
                <option value="여아">여아</option>
              </select>
            </div>

            <div className={styles.petPrifDisplay}>
              <p className={styles.formSubTitle}>나이</p>

              <div>
                <div className={styles.siasiadl}>
                  <select
                    name="yy"
                    id="year"
                    ref={yyRef}
                    className={styles.selcetBirth}
                  ></select>

                  <select
                    name="mm"
                    id="month"
                    ref={mmRef}
                    className={styles.selcetBirth}
                  ></select>

                  <select
                    name="dd"
                    id="day"
                    ref={ddRef}
                    className={styles.selcetBirth}
                  ></select>
                </div>
                <p className={styles.alret}>
                  생년월일을 모르면, 임의로 부탁드립니다.
                </p>
              </div>
            </div>

            <div className={styles.petPrifDisplay}>
              <p className={styles.formSubTitle}>분류</p>
              <select name="type" ref={typeRef} className={styles.selcet}>
                <option value="강아지">강아지</option>
                <option value="고양이">고양이</option>
              </select>
            </div>
            <div className={styles.petPrifDisplay}>
              <p className={styles.formSubTitle}>견.묘종</p>
              <input
                className={styles.inputWidth}
                type="text"
                name="kind"
                ref={kindRef}
                placeholder="예) 세상에 하나뿐인 믹스"
                required
              />
            </div>

            <div className={styles.petPrifDisplay}>
              <label htmlFor="category" className={`${styles.formSubTitle}`}>
                몸무게
              </label>
              <select
                name="weight"
                ref={weightRef}
                className={`${styles.selcet}`}
              >
                <option value="1 - 3 kg"> 1 - 3 kg </option>
                <option value="4 - 7 kg"> 4 - 7 kg </option>
                <option value="8 - 11 kg"> 8 - 11 kg </option>
                <option value="12 - 14 kg"> 12 - 14 kg </option>
                <option value="15 - 18 kg"> 15 - 18 kg </option>
                <option value="19 kg 이상"> 19 kg 이상 </option>
              </select>
            </div>

            <div className={styles.petPrifDisplay}>
              <p className={`${styles.formSubTitle}`}>설명</p>
              <textarea
                name="content"
                placeholder="내용을 입력해 주세요."
                required
              ></textarea>
            </div>

            {/* 취소 완료 버튼 */}
            <div className={`${styles.submitButton}`}>
              <button onClick={onResetPage}>취소</button>
              <button type="button" onClick={onCompleteBtn}>
                완료
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default PetProfile;
