import React from 'react';

import './pagination.css';

interface PaginationProps {
  currentPage: number;
  pagesNumber: number;
  onChange: (page: number) => () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pagesNumber,
  onChange,
}) => {
  const commonPagination = (
    <>
      <span className='page' onClick={onChange(1)}>
        1
      </span>
      <span>..</span>
      <span className='page' onClick={onChange(currentPage - 2)}>
        {currentPage - 2}
      </span>
      <span className='page' onClick={onChange(currentPage - 1)}>
        {currentPage - 1}
      </span>
      <span className='page active'>{currentPage}</span>
      <span className='page' onClick={onChange(currentPage + 1)}>
        {currentPage + 1}
      </span>
      <span className='page' onClick={onChange(currentPage + 2)}>
        {currentPage + 2}
      </span>
      <span>..</span>
      <span className='page' onClick={onChange(pagesNumber)}>
        {pagesNumber}
      </span>
    </>
  );

  const start: number[] = [];
  for (let i = 1; i <= Math.min(6, pagesNumber); i++) {
    start.push(i);
  }

  const startPagination = (
    <>
      {start.map((page, idx) => (
        <span
          key={idx}
          className={`page ${page === currentPage && 'active'}`}
          onClick={onChange(page)}
        >
          {page}
        </span>
      ))}
      {pagesNumber > 6 && (
        <>
          {pagesNumber > 7 && <span>..</span>}
          <span className='page' onClick={onChange(pagesNumber)}>
            {pagesNumber}
          </span>
        </>
      )}
    </>
  );

  const end: number[] = [];
  for (let i = Math.max(1, pagesNumber - 5); i <= pagesNumber; i++) {
    end.push(i);
  }

  const endPagination = (
    <>
      {pagesNumber > 6 && (
        <>
          <span className='page' onClick={onChange(1)}>
            1
          </span>
          {pagesNumber > 7 && <span>..</span>}
        </>
      )}
      {end.map((page, idx) => (
        <span
          key={idx}
          className={`page ${page === currentPage && 'active'}`}
          onClick={onChange(page)}
        >
          {page}
        </span>
      ))}
    </>
  );

  return (
    <div className='control'>
      <button onClick={onChange(currentPage - 1)} disabled={currentPage === 1}>
        Назад
      </button>
      <span className='pagination'>
        {currentPage <= 4 && startPagination}
        {currentPage >= pagesNumber - 3 && currentPage > 4 && endPagination}
        {currentPage > 4 && currentPage < pagesNumber - 3 && commonPagination}
      </span>
      <button
        onClick={onChange(currentPage + 1)}
        disabled={currentPage === pagesNumber || pagesNumber === 0}
      >
        Далее
      </button>
    </div>
  );
};

export default Pagination;
