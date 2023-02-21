import React from 'react';

import TestImg from '../assets/TestImg1.jpg';
import styles from './css/ChatList.module.css';

const ChatList = ({ chatData, onClickChatData }) => {
  return (
    <div
      onClick={() => {
        onClickChatData(chatData);
      }}
      className={styles.chatList}
    >
      <div>
        <h1>{chatData['supply.title']}</h1>
        <span></span>
      </div>
      <img src={`/uploadImg/${chatData['supply.cover']}`} alt="" />
    </div>
  );
};

export default ChatList;
