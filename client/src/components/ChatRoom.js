import React, { useRef, useState } from 'react';
import styles from './css/ChatRoom.module.css';

import TestImg from '../assets/TestImg1.jpg';

const ChatRoom = ({ chatData, categoryType, chatRef }) => {
  const inputRef = useRef();

  /*전송이벤트 */
  const btnSend = () => {
    const inputText = inputRef.current.value;
    console.log('채팅입력후 전송하는 이벤트');
    console.log(inputText);
  };

  /*엔터 이벤트 */
  const enter = (e) => {
    if (e.keyCode == 13) {
      btnSend();
    }
  };

  const onClickCheckSoldOut = () => {
    console.log('판매완료버튼누름');
  };

  const onClickExit = () => {
    console.log('채팅종료버튼누름');
  };

  return (
    <div
      className={`${styles.chatRoom} ${styles[`${categoryType}`]}`}
      ref={chatRef}
    >
      {/**상품정보창 */}
      <div className={styles.item}>
        <div>
          <img src={TestImg} alt="" />
          <div>
            <h1>상품제목</h1>
            <span>{chatData.content}</span>
          </div>
        </div>
        {/**상품정보 */}
        <div>
          <button
            className={`${styles.checkSoldBtn} ${styles[`${categoryType}`]}`}
            onClick={onClickCheckSoldOut}
          >
            판매완료확인
          </button>
          <button
            className={`${styles.exitBtn} ${styles[`${categoryType}`]}`}
            onClick={onClickExit}
          >
            채팅종료
          </button>
        </div>
        {/**버튼2개 */}
      </div>
      {/**카톡내용창 */}
      <div className={styles.chatpage}>
        <div className={styles.container}>
          <div className={`${styles.myChat} ${styles[`${categoryType}`]}`}>
            <div>나의 메세지</div>
          </div>
          <div className={styles.otherChat}>
            <div>상대 메세지</div>
          </div>
        </div>
      </div>
      <div className={styles.inputSection}>
        <input type="text" id="msg_box" onKeyDown={enter} ref={inputRef} />
        <button onClick={btnSend} className={`${styles[`${categoryType}`]}`}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
