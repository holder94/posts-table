import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Pagination from '../pagination/Pagination';
import './table.css';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

enum SortOrder {
  ASC = 1,
  DESC = -1,
}

const newOrder = {
  [SortOrder.ASC]: SortOrder.DESC,
  [SortOrder.DESC]: SortOrder.ASC,
};

interface TableProps {
  posts: IPost[];
}

const Table: React.FC<TableProps> = ({ posts }) => {
  const { page } = useParams();
  const currentPage = parseInt(page!);
  const navigate = useNavigate();

  const [slice, setSlice] = useState(() =>
    posts.slice(10 * currentPage - 10, 10 * currentPage)
  );
  const [idSort, setIdSort] = useState(SortOrder.ASC);
  const [titleSort, setTitleSort] = useState(SortOrder.ASC);
  const [descriptionSort, setDescriptionSort] = useState(SortOrder.ASC);

  const pagesNumber = Math.ceil(posts.length / 10);

  useEffect(() => {
    if (currentPage > pagesNumber) {
      navigate('/1');
    }

    setSlice(posts.slice(10 * currentPage - 10, 10 * currentPage));

    setIdSort(SortOrder.ASC);
    setTitleSort(SortOrder.ASC);
    setDescriptionSort(SortOrder.ASC);
  }, [currentPage, posts]);

  const onChangeCurrentPage = (page: number) => {
    return () => {
      navigate(`/${page}`);
    };
  };

  const sortById = (order: SortOrder) => {
    return () => {
      setIdSort(order);
      setSlice(slice => [...slice].sort((a, b) => order * (a.id - b.id)));
    };
  };

  const sortByTextField = (
    field: Exclude<keyof IPost, 'id' | 'userId'>,
    order: SortOrder
  ) => {
    return () => {
      if (field === 'title') {
        setTitleSort(order);
      } else {
        setDescriptionSort(order);
      }

      setSlice(slice =>
        [...slice].sort((a, b) => order * a[field].localeCompare(b[field]))
      );
    };
  };

  return (
    <div className='table'>
      <span
        className={`table-header table-header_id ${
          idSort === SortOrder.DESC && 'desc'
        }`}
        onClick={sortById(newOrder[idSort])}
      >
        ID
      </span>
      <span
        className={`table-header table-header_title ${
          titleSort === SortOrder.DESC && 'desc'
        }`}
        onClick={sortByTextField('title', newOrder[titleSort])}
      >
        Заголовок
      </span>
      <span
        className={`table-header table-header_description ${
          descriptionSort === SortOrder.DESC && 'desc'
        }`}
        onClick={sortByTextField('body', newOrder[descriptionSort])}
      >
        Описание
      </span>
      {slice.map((post, idx) => (
        <div className='table-row' key={idx}>
          <span className='table-row_item table-row_id'>{post.id}</span>
          <span className='table-row_item table-row_title'>{post.title}</span>
          <span className='table-row_item table-row_description'>
            {post.body}
          </span>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        pagesNumber={pagesNumber}
        onChange={onChangeCurrentPage}
      />
    </div>
  );
};

export default Table;
