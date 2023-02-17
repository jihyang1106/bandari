import React, { useEffect, useState, useRef } from 'react';
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
  const [selected, setSelected] = useState(false);
  const [categoryType, setCategoryType] = useState('');

  const swtichType = useSelector((state) => state.typeSwitch.switchState);
  const user = useSelector((state) => state.user.user.data); /*유저데이터* */

  const chatRoomRef = useRef();
  const closeBtnRef = useRef();

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    if (swtichType === 'basic') {
      setCategoryType('basic');
    } else if (swtichType === 'puppy') {
      setCategoryType('puppy');
    } else {
      setCategoryType('cat');
    }
  }, [swtichType]);

  /**채팅정보가져오기 */
  const getChats = () => {
    console.log(`채팅정보가져오기, user : ${user}`);
  };

  const onClickChatData = (chatData) => {
    console.log('채팅클릭');
    if (chatRoomRef.current) {
      chatRoomRef.current.classList.remove(`${styles.transparent}`);
    }
    closeBtnRef.current.classList.remove(`${styles.transparent}`);
    setSelectChat(true);
    setSelectedChat(chatData);
    setSelected(true);
  };

  const onClickClose = () => {
    console.log('눌림');
    chatRoomRef.current.classList.add(`${styles.transparent}`);
    closeBtnRef.current.classList.add(`${styles.transparent}`);
    setSelected(false);
  };

  return (
    <>
      <Nav />
      <div className={styles.chatPage}>
        <section>
          <Category />
          <div className={styles.chats}>
            <button
              className={`${styles.closeBtn} ${styles.transparent}`}
              onClick={onClickClose}
              ref={closeBtnRef}
            >
              X
            </button>
            <div
              className={`${styles.chatList} ${styles[`${categoryType}`]} ${
                styles[`${selected}`]
              }`}
            >
              <h1>채팅목록</h1>
              <div>
                {chatDatas.map((chatData, index) => {
                  return (
                    <ChatList
                      key={index}
                      chatData={chatData}
                      onClickChatData={onClickChatData}
                    />
                  );
                })}
              </div>
            </div>
            {selectChat ? (
              <ChatRoom
                chatData={selectedChat}
                categoryType={categoryType}
                chatRef={chatRoomRef}
              />
            ) : (
              <div className={styles.chatEmptyDiv}>채팅을 선택하세요</div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ChatPage;
