import classNames from 'classnames/bind';
import React from 'react';
import { usePagination, useSelector } from '../../../hooks';
import styles from './PagesList.module.scss';

interface Props {
  totalPages: number;
  pageChangeHandler: (page: number) => () => void;
}

export const PagesList: React.FC<Props> = ({
  totalPages,
  pageChangeHandler,
}) => {
  const cx = classNames.bind(styles);

  const { currentPage } = useSelector(s => s.posts);
  const { pages, isActive } = usePagination({ currentPage, totalPages });

  return (
    <ul className={styles.pages}>
      {pages.map(page => (
        <li className={cx('page', { active: isActive(page) })} key={page}>
          <button onClick={pageChangeHandler(page)}>{page}</button>
        </li>
      ))}
    </ul>
  );
};
