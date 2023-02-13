import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  setStateBasic,
  setStatePuppy,
  setStateCat,
} from '../store/module/typeSwitch';

import './css/SwitchBtn.css';

const SwitchBtn = () => {
  const puppyBtnRef = useRef();
  const catBtnRef = useRef();
  const basicBtnRef = useRef();
  const [swtichType, setSwitchType] = useState('');

  const dispatch = useDispatch();
  const btnState = useSelector((state) => state.typeSwitch.switchState);

  useEffect(() => {
    if (btnState === 'basic') {
      setSwitchType('기본');
      basicBtnRef.current.classList.add('clicked');
    } else if (btnState === 'puppy') {
      setSwitchType('강아지');
      puppyBtnRef.current.classList.add('clicked');
    } else {
      setSwitchType('고양이');
      catBtnRef.current.classList.add('clicked');
    }
  }, [btnState]);

  const clickSwitch = (e) => {
    const target = e.target;
    if (target.value === 'basic') {
      dispatch(setStateBasic());
      puppyBtnRef.current.classList.remove('clicked');
      catBtnRef.current.classList.remove('clicked');
    } else if (target.value === 'puppy') {
      dispatch(setStatePuppy());
      catBtnRef.current.classList.remove('clicked');
      basicBtnRef.current.classList.remove('clicked');
    } else if (target.value === 'cat') {
      dispatch(setStateCat());
      puppyBtnRef.current.classList.remove('clicked');
      basicBtnRef.current.classList.remove('clicked');
    }
  };

  return (
    <div className="switchBtn">
      <button
        className="puppyBtn"
        onClick={clickSwitch}
        value="puppy"
        ref={puppyBtnRef}
      >
        강아지
      </button>
      <button
        className="basicBtn"
        onClick={clickSwitch}
        value="basic"
        ref={basicBtnRef}
      >
        기본
      </button>
      <button
        className="catBtn"
        onClick={clickSwitch}
        value="cat"
        ref={catBtnRef}
      >
        고양이
      </button>
    </div>
  );
};

export default SwitchBtn;
