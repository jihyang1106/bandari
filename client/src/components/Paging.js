import React from 'react';
import Pagination from 'react-js-pagination';

import './css/Paging.css';

const Paging = ({ page, count, setPage }) => {
  return (
    <div>
      <Pagination
        activePage={page}
        // sellpage postPerPage 아이템 갯수랑 맞춰야한다.
        itemsCountPerPage={8}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={'<'}
        nextPageText={'>'}
        onChange={setPage}
      />
    </div>
  );
};

export default Paging;
