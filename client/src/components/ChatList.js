import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TestImg from '../assets/TestImg1.jpg';
import styles from './css/ChatList.module.css';

const ChatList = ({ chatData, onClickChatData }) => {
  console.log(chatData);
  return (
    <div
      onClick={() => {
        onClickChatData(chatData);
      }}
      className={styles.chatList}
    >
      <div>
        <h1>{chatData.userId}</h1>
        <span>{chatData.content}</span>
      </div>
      <img src={TestImg} alt="" />
    </div>
  );
};

export default ChatList;
