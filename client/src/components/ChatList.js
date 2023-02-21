import React from 'react';

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
        <h1>{chatData['supply.user.nickname']}</h1>
        <h1>{chatData['user.nickname']}</h1>
        <span>{chatData['supply.title']}</span>
      </div>
      <img src={`/uploadImg/${chatData['supply.cover']}`} alt="" />
    </div>
  );
};

export default ChatList;
