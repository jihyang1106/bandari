import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import styles from './css/ChatPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import ChatList from '../components/ChatList';
import ChatRoom from '../components/ChatRoom';
import { useLocation } from 'react-router-dom';

import axios from 'axios';

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

  // 채팅방
  const [chatRoom, setChatRoom] = useState([]);

  // 현재 로그인 한 유저
  const userId = useSelector((state) => state.user.user.isLogin);
  console.log('userId', userId);

  const chatRoomRef = useRef();
  const closeBtnRef = useRef();

  // useEffect(() => {
  //   getChats();
  // }, []);

  /** SalesDetail에서 넘어온 데이터 값 */
  const location = useLocation();
  const result = location.state;
  console.log('salesDatail에서 넘어온 데이터', result);

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
  // const getChats = () => {
  //   console.log(`채팅정보가져오기, user : ${userId}`);
  // };

  // 채팅 페이지 렌더 시 현재 로그인한 유저의 room에 있는 데이터 가져오기
  useEffect(() => {
    axios.get('/room/getData', { params: { id: userId } }).then((res) => {
      setChatRoom(res.data);
      // if 내가 만든 채팅방만 있을 때
      // if 상대방이 만든 채팅방만 있을 떄
      // if 모든 채팅방이 다 있을 때
    });
  }, []);

  console.log(chatRoom);
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
                {/* {chatDatas.map((chatData, index) => {
                  return (
                    <ChatList
                      key={index}
                      chatData={chatData}
                      onClickChatData={onClickChatData}
                    />
                  );
                })} */}
                {chatRoom.map((chatData, idx) => {
                  return (
                    <ChatList
                      key={idx}
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
