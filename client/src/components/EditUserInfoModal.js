import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/EditUserInfoModal.module.css';

const EditUserInfoModal = ({ display, setDisplay }) => {
  const userId = localStorage.getItem('userId')
  const btnState = useSelector((state) => state.typeSwitch.switchState);
  const userNameRef = useRef();
  const userPhoneNumberRef = useRef();
  const navigate = useNavigate();

  const onClickCloseModal = () => {
    setDisplay(false);
  };

  /**회원정보수정완료 */
  const onClickEditUserInfo = () => {
    const name = userNameRef.current.value; //변경이름
    const phoneNum = userPhoneNumberRef.current.value; //변경폰번호

    console.log('회원정보수정 완료버튼클릭');
    console.log(userId);
    axios({
      method: 'patch',
      url: '/mypage/patchUser',
      data: {
        userName: name,
        userPhoneNumber: phoneNum,
        userId: userId,
      },
    }).then((res) => {
      alert('사용자 변경 완료');
      window.location.href = 'http://localhost:3000/myPage';
    });
  };
  return (
    <div className={`${styles.editModal} ${styles[`display${display}`]}`}>
      <form
        action=""
        className={`${styles.modalForm} ${styles[`${btnState}`]}`}
      >
        <h1>회원정보수정</h1>
        <div>
          <label htmlFor="userName">이름</label>
          <input type="text" id="userName" ref={userNameRef} />
        </div>
        <div>
          <label htmlFor="userPhoneNumber">전화번호</label>
          <input type="text" id="userPhoneNumber" ref={userPhoneNumberRef} />
        </div>
        <div>
          <input type="submit" value="취소" onClick={onClickCloseModal} />
          <input type="button" value="수정" onClick={onClickEditUserInfo} />
        </div>
      </form>
      <button onClick={onClickCloseModal}>X</button>
    </div>
  );
};

export default EditUserInfoModal;
