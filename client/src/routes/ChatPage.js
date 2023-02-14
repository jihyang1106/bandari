import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './css/ChatPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import ChatList from '../components/ChatList';
import ChatRoom from '../components/ChatRoom';

const chatDatas = [
  {
    room: 1,
    suppliesId: 1,
    userId: 'a',
    content: '내용입니다1',
  },
  {
    room: 2,
    suppliesId: 2,
    userId: 'b',
    content: '내용입니다2',
  },
  {
    room: 3,
    suppliesId: 3,
    userId: 'c',
    content: '내용입니다3',
  },
];

const ChatPage = () => {
  const [selectChat, setSelectChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState({});
  const swtichType = useSelector((state) => state.typeSwitch.switchState);
  const [categoryType, setCategoryType] = useState('');
  useEffect(() => {
    if (swtichType === 'basic') {
      setCategoryType('basic');
    } else if (swtichType === 'puppy') {
      setCategoryType('puppy');
    } else {
      setCategoryType('cat');
    }
  }, [swtichType]);

  const onClickChatData = (chatData) => {
    console.log('채팅클릭');
    setSelectChat(true);
    setSelectedChat(chatData);
  };

  return (
    <>
      <Nav />
      <div className={styles.chatPage}>
        <section>
          <Category />
          <div className={styles.chats}>
            <div className={`${styles.chatList} ${styles[`${categoryType}`]}`}>
              <h1>채팅목록</h1>
              <div>
                {chatDatas.map((chatData, index) => {
                  return (
                    <ChatList
                      chatData={chatData}
                      onClickChatData={onClickChatData}
                    />
                  );
                })}
              </div>
            </div>
            {selectChat ? (
              <ChatRoom chatData={selectedChat} categoryType={categoryType} />
            ) : (
              <img src="" alt="" />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ChatPage;
