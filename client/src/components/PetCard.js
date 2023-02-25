import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './css/PetCard.module.css';

const PetCard = (pet) => {
  const btnState = useSelector((state) => state.typeSwitch.switchState);
  const navigate = useNavigate();

  /**펫정보수정이동*/
  const onClickEditPetInfo = () => {
    navigate('/editPetInfoPage', {
      state: { pet },
    });
  };

  return (
    <div
      className={`${styles.myPetInfo} ${styles.marginBottom} ${
        styles[`${btnState}`]
      }`}
    >
      <img src={`/petImg/${pet.pet.petImg}`} className={styles.petImg} alt="" />
      <div className={styles.petInfo}>
        <p>{pet.pet.name}</p>
        <p>
          {pet.pet.age} / {pet.pet.gender} / {pet.pet.petType} /{' '}
          {pet.pet.weight}
        </p>
        <p>{pet.pet.info}</p>
      </div>
      <button onClick={onClickEditPetInfo}>정보수정</button>
    </div>
  );
};

export default PetCard;
