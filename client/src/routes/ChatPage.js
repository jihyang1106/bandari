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
  const [selectChat, setSelectChat] = useState(false); //채팅방 선택 유무
  const [selectedChat, setSelectedChat] = useState({});
  const [selected, setSelected] = useState(false);
  const [categoryType, setCategoryType] = useState('');
  const swtichType = useSelector((state) => state.typeSwitch.switchState);

  // 채팅방
  const [chatRoom, setChatRoom] = useState([]);

  // 현재 로그인 한 유저
  // const userId = localStorage.getItem('userId')
  const user = sessionStorage.getItem('userId');

  const chatRoomRef = useRef();

  useEffect(() => {
    console.log('selecttChat', selectChat);
  }, [selectChat]);

  useEffect(() => {
    if (swtichType === 'basic') {
      setCategoryType('basic');
    } else if (swtichType === 'puppy') {
      setCategoryType('puppy');
    } else {
      setCategoryType('cat');
    }
  }, [swtichType]);

  // 채팅 페이지 렌더 시 현재 로그인한 유저의 room에 있는 데이터 가져오기
  useEffect(() => {
    axios.get('room/getData', { params: { id: user } }).then((res) => {
      setChatRoom(res.data);
    });
  }, []);

  const onClickChatData = async (chatData) => {
    /**상대방 확인 하는 로직 chatData.other가 상대방 */
    if (chatData.otherId !== user) chatData.other = chatData.otherId;
    else chatData.other = chatData.userId;
    if (chatRoomRef.current) {
      chatRoomRef.current.classList.remove(`${styles.transparent}`);
    }

    setSelectedChat(chatData);
    setSelected(true);
    setSelectChat(true);
  };

  const changeChatRoom = (chatData, closeEvent) => {
    onClickChatData(chatData);
  };

  return (
    <>
      <Nav />
      <div className={styles.chatPage}>
        <section>
          <Category />
          <div className={styles.chats}>
            <div
              className={`${styles.chatList} ${styles[`${categoryType}`]} ${
                styles[`${selectChat}`]
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
                {chatRoom.length > 0 ? (
                  chatRoom.map((chatData, idx) => {
                    return (
                      <ChatList
                        key={idx}
                        chatData={chatData}
                        onClickChatData={onClickChatData}
                        setSelectChat={setSelectChat}
                      />
                    );
                  })
                ) : (
                  <div>chating이 없습니다.</div>
                )}
              </div>
            </div>
            {selectChat ? (
              <ChatRoom
                ref={chatRoomRef}
                chatData={selectedChat}
                categoryType={categoryType}
                chatRef={chatRoomRef}
                setSelectChat={setSelectChat}
              />
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ChatPage;
