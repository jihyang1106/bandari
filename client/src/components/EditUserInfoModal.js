import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './css/EditUserInfoModal.module.css';

const EditUserInfoModal = ({ display, setDisplay }) => {
  const btnState = useSelector((state) => state.typeSwitch.switchState);
  const userNameRef = useRef();
  const userPhoneNumberRef = useRef();
  const navigate = useNavigate();

  const onClickCloseModal = () => {
    setDisplay(false);
  };

  /**회원정보수정완료 */
  const onClickEditUserInfo = () => {
    console.log('회원정보수정 완료버튼클릭');
    const name = userNameRef.current.value; //변경이름
    const phoneNum = userPhoneNumberRef.current.value; //변경폰번호
    alert('정보가 수정되었습니다.');
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
          <input type="submit" value="수정" onClick={onClickEditUserInfo} />
        </div>
      </form>
      <button onClick={onClickCloseModal}>X</button>
    </div>
  );
};

export default EditUserInfoModal;
