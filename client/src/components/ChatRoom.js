import React, { useEffect, useRef, useState } from 'react';
import styles from './css/ChatRoom.module.css';
import axios from 'axios';
import { io } from 'socket.io-client';

const ChatRoom = ({ chatData, categoryType, chatRef, setSelectChat }) => {
  const user = sessionStorage.getItem('userId'); // 로그인한 유저

  const inputRef = useRef();
  const chat = useRef();

  const [send, setSend] = useState(false); //채팅 전송 시 바뀜

  // 채팅 목록에서 채팅방 클릭 시 DB에서 chat 가져오기
  useEffect(() => {
    axios.get('chat/getData', { params: { id: chatData.id } }).then((res) => {
      res.data.forEach((el, idx) => {
        if (el.userId === user) {
          chat.current.insertAdjacentHTML(
            'beforeend',
            `<div class='${styles.myChat} ${styles[categoryType]}'>` +
              `<span>${el.time}</span>` +
              `<div>` +
              `${el.msg}` +
              '</div>' +
              '</div>'
          );
        } else {
          chat.current.insertAdjacentHTML(
            'beforeend',
            `<div class=` +
              `${styles.otherChat}>` +
              `${el.time}` +
              `<div>` +
              `${el.msg}` +
              '</div>'
          );
        }
      });
    });
  }, []);

  //스크롤 위치를 위함
  const resetScroll = () => {
    window.setTimeout(() => {
      chat.current.scrollTop = chat.current.scrollHeight - 100;
    }, 50);
  };
  useEffect(() => {
    resetScroll();
  }, []);

  // let socket = io.connect('http://localhost:5000');
  let socket = io.connect('https://bandari.store:5000');

  const closeBtnRef = useRef();

  // 현재 채팅에 들어온 유저와 방 번호
  socket.emit('loginUser', { user: user, roomId: chatData.id });

  /*전송이벤트 */
  const btnSend = () => {
    const inputText = inputRef.current.value;
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
    axios.post('chat/insert', datas);
    inputRef.current.value = '';
    resetScroll();
  };

  socket.on('newMsg', (data) => {
    if (user === data.userId) {
      chat.current.insertAdjacentHTML(
        'beforeend',
        `<div class='${styles.myChat} ${styles[categoryType]}'>` +
          `<span>${data.time}</span>` +
          `<div>` +
          `${data.msg}` +
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

  /**채팅 방만 나가기 */
  const onClickClose = () => {
    chatRef.current.classList.add(`${styles.transparent}`);
    socket.disconnect();
    setSelectChat(false);
  };

  /**판매 완료 버튼 이벤트 */
  const onClickCheckSoldOut = (seller) => {
    if (seller != user) {
      alert('용품을 판매하는 사람만 판매 완료를 할 수 있습니다.');
    } else {
      if (window.confirm('정말 판매 완료 하시겠습니까?')) {
        axios
          .patch('/supplies/updateDeal', {
            id: chatData.suppliesId,
            buyer: chatData.buyer,
          })
          .then((res) => {
            if (res.data[0] === 1) alert('판매완료 되었습니다!');
            else alert('이미 판매완료된 상품입니다.');
          });
      } else return;
    }
  };

  /** 채팅 종료 버튼 이벤트 : 채팅 삭제 */
  const onClickExit = () => {
    if (
      window.confirm(
        '채팅을 종료하시겠습니까? 채팅방의 모든 내용이 삭제됩니다.'
      )
    ) {
      axios.delete('room/delete', { data: { id: chatData.id } }).then((res) => {
        if (res.data.result === 1) alert('성공적으로 채팅방에서 나가졌습니다!');
        else alert('이미 채팅방에서 나가졌습니다.');
        socket.disconnect();
        onClickClose();
        window.location.reload();
      });
    }
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
            <p>{chatData['supply.content']}</p>
          </div>
        </div>
        {/**상품정보 */}
        <div>
          <button
            className={`${styles.checkSoldBtn} ${styles[`${categoryType}`]}`}
            onClick={() => {
              onClickCheckSoldOut(chatData.seller);
            }}
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
        <div ref={chat} className={styles.container}></div>
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
