import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './MainPage';
import SellPage from './SellPage';
import MyPage from './MyPage';
import ChatPage from './ChatPage';
import DonatePage from './DonatePage';
import ErrorPage from './ErrorPage';
import SellForm from './SellForm';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sellForm" element={<SellForm />} />
        <Route path="/sellPage" element={<SellPage />}></Route>

        <Route path="/myPage" element={<MyPage />} />
        <Route path="/chatPage" element={<ChatPage />} />
        <Route path="/donatePage" element={<DonatePage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
