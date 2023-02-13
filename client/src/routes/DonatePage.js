import React from 'react';

import Nav from '../components/Nav';
import Category from '../components/Category';

const DonatePage = () => {
  return (
    <>
      <Nav />
      <div>
        <section>
          <Category />
          기부관련페이지
        </section>
      </div>
    </>
  );
};

export default DonatePage;
