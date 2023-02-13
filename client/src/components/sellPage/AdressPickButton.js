import React from 'react';
import styles from '../css/sellPage/AdressPickButton.module.css';
import locationIcon from '../../assets/Location.png';

export default function AdressPickButton() {
  return (
    <button className={styles.adressPickButton}>
      <img src={locationIcon} alt="주소지 버튼 아이콘" />
      성북구 창경궁로 35다길
    </button>
  );
}
