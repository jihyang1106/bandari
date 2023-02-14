import React from 'react';
import styles from './css/ChatRoom.module.css';

import TestImg from '../assets/TestImg1.jpg';

const ChatRoom = ({ chatData, categoryType }) => {
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
      <div></div>
    </div>
  );
};

export default ChatRoom;
