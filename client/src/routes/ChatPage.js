import React from 'react';

import styles from './css/ChatPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';

const ChatPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.chatPage}>
        <section>
          <Category />
          채팅페이지
        </section>
      </div>
    </>
  );
};

export default ChatPage;
