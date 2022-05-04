import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import { setCurrentPage } from '../../store/reducers/postsSlice';
import { PagesList } from './PagesList/PagesList';
import styles from './Pagination.module.scss';

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();

  const setSearchParams = useSearchParams()[1];
  const { totalPages, currentPage } = useSelector(s => s.posts);

  const pageChangeHandler = (page: number) => () => {
    dispatch(setCurrentPage(page));
    setSearchParams({ page: String(page) });
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        disabled={currentPage <= 1}
        onClick={pageChangeHandler(currentPage - 1)}
      >
        Назад
      </button>
      <PagesList
        totalPages={totalPages}
        pageChangeHandler={pageChangeHandler}
      />
      <button
        className={styles.button}
        disabled={currentPage >= totalPages}
        onClick={pageChangeHandler(currentPage + 1)}
      >
        Далее
      </button>
    </div>
  );
};
