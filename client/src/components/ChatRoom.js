import React, { useRef } from 'react';
import styles from './css/ChatRoom.module.css';

import TestImg from '../assets/TestImg1.jpg';

const ChatRoom = ({ chatData, categoryType }) => {
  const inputRef = useRef();

  /*전송이벤트 */
  const btnSend = () => {
    const inputText = inputRef.current.value;
    console.log(inputText);
  };

  /*엔터 이벤트 */
  const enter = (e) => {
    if (e.keyCode == 13) {
      btnSend();
    }
  };

  console.log(chatData);
  return (
    <div className={`${styles.chatRoom} ${styles[`${categoryType}`]}`}>
      {/**상품정보창 */}
      <div className={styles.item}>
        <div>
          <img src={TestImg} alt="" />
          <div>
            <h1>상품제목</h1>
            <span>{chatData.content}</span>
          </div>
        </div>
        <button className={` ${styles[`${categoryType}`]}`}>
          판매완료확인
        </button>
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
