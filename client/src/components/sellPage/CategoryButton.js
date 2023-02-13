import React from 'react';
import styles from '../css/sellPage/CategoryButton.module.css';

export default function CategoryButton({ text, mainColor, hoverColor }) {
  return <button className={styles.categoryButton}>{text}</button>;
}
