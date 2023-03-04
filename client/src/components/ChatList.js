import React from 'react';

import styles from './css/ChatList.module.css';

const ChatList = ({ chatData, onClickChatData, setSelectChat }) => {
  return (
    <div
      onClick={() => {
        onClickChatData(chatData);
        setSelectChat(true);
      }}
      className={styles.chatList}
    >
      <div>
        {chatData['supply.user.nickname'] ? (
          <>
            <span>판매하는 사람</span>
            <h1>{chatData['supply.user.nickname']}</h1>
          </>
        ) : (
          <>
            <span>연락준 사람</span>
            <h1>{chatData['user.nickname']}</h1>
          </>
        )}
        <span>{chatData['supply.title']}</span>
      </div>
      <img src={`/uploadImg/${chatData['supply.cover']}`} alt="" />
    </div>
  );
};

export default ChatList;
