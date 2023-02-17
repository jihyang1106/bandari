import styles from './css/SellForm.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import SellForm from '../components/SellForm';

const SellPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.sellForm}>
        <section>
          <Category />
          <SellForm />
        </section>
      </div>
    </>
  );
};

export default SellPage;
