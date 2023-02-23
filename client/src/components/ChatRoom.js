import React, { createElement, useEffect, useRef, useState } from 'react';
import styles from './css/ChatRoom.module.css';
import axios from 'axios';
import { io } from 'socket.io-client';

const ChatRoom = ({ chatData, categoryType, chatRef, setSelectChat }) => {
  let socket = io.connect('http://localhost:5000');
  const closeBtnRef = useRef();
  // console.log('room으로 넘어온 chatData', chatData);
  //   console.log('상대방', chatData.other);

  console.log('room으로 넘어온 chatData', chatData);
  console.log('상대방', chatData.other);

  const user = sessionStorage.getItem('userData');

  console.log('room id', chatData.id); // chatDB의 roomId
  console.log('userId', user); // chatDB의 userId

  // 현재 채팅에 들어온 유저와 방 번호
  socket.emit('loginUser', { user: user, roomId: chatData.id });

  /*전송이벤트 */
  const inputRef = useRef();
  const chat = useRef();

  const btnSend = () => {
    const inputText = inputRef.current.value;
    console.log('채팅입력후 전송하는 이벤트');
    // 시간
    let hourMin = new Date().toTimeString().split(' ')[0];
    hourMin = hourMin.substring(0, hourMin.lastIndexOf(':'));
    const datas = {
      msg: inputText,
      time: hourMin,
      userId: user,
      roomId: chatData.id,
    };
    socket.emit('sendMsg', datas);
    axios.post('chat/insert', datas).then((res) => {
      console.log('res.data', res.data);
    });
  };

  const onClickClose = () => {
    console.log('채팅방 close');
    chatRef.current.classList.add(`${styles.transparent}`);
    setSelectChat(false);
  };

  socket.on('newMsg', (data) => {
    console.log(`server에서 받아온 data : ${data}`);
    if (user === data.userId) {
      chat.current.insertAdjacentHTML(
        'beforeend',
        `<div class='${styles.myChat} ${styles[categoryType]}'>` +
          `<span>${data.time}</span>` +
          `<div>` +
          +`${data.msg}` +
          '</div>' +
          '</div>'
      );
    } else {
      chat.current.insertAdjacentHTML(
        'beforeend',
        `<div class=` +
          `${styles.otherChat}>` +
          `${data.time}` +
          `<div>` +
          `${data.msg}` +
          '</div>'
      );
    }
  });

  /**판매 완료 버튼 이벤트 */
  const onClickCheckSoldOut = () => {
    axios
      .patch('/supplies/updateDeal', {
        id: chatData.suppliesId,
      })
      .then((res) => {
        if (res.data[0] === 1) alert('판매완료 되었습니다!');
        else alert('이미 판매완료된 상품입니다.');
      });
  };

  /** 채팅 종료 버튼 이벤트 : 채팅 삭제 */
  const onClickExit = () => {
    console.log('채팅종료버튼누름');
    io.emit('leave', chatData.id);
    io.close();
  };

  /*엔터 이벤트 */
  const enter = (e) => {
    if (e.keyCode == 13) {
      btnSend();
    }
  };
  return (
    <div
      className={`${styles.chatRoom} ${styles[`${categoryType}`]}`}
      ref={chatRef}
    >
      <button
        className={`${styles.closeBtn}`}
        onClick={() => {
          onClickClose();
        }}
        ref={closeBtnRef}
      >
        X
      </button>
      {/**상품정보창 */}
      <div className={styles.item}>
        <div>
          <img src={`/uploadImg/${chatData['supply.cover']}`} alt="" />
          <div>
            <h1>{chatData['supply.title']}</h1>
            <span>{chatData['supply.content']}</span>
          </div>
        </div>
        {/**상품정보 */}
        <div>
          <button
            className={`${styles.checkSoldBtn} ${styles[`${categoryType}`]}`}
            onClick={onClickCheckSoldOut}
          >
            판매완료확인
          </button>
          <button
            className={`${styles.exitBtn} ${styles[`${categoryType}`]}`}
            onClick={onClickExit}
          >
            채팅종료
          </button>
        </div>
        {/**버튼2개 */}
      </div>
      {/**카톡내용창 */}
      <div className={styles.chatpage}>
        <div ref={chat} className={styles.container}>
          {/* <div
            className={`${styles.myChat} ${styles[`${categoryType}`]}`}
          ></div>
          <div className={styles.otherChat}></div> */}
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
