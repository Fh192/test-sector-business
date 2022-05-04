import React from 'react';
import arrowIcon from '../../../assets/arrow.svg';
import { useDispatch, useSelector } from '../../../hooks';
import { setSort } from '../../../store/reducers/postsSlice';
import { ISort } from '../../../types/posts';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { sort } = useSelector(s => s.posts);

  const clickHandler = (sort: ISort) => () => {
    dispatch(setSort(sort));
  };

  const isActive = (currentSort: ISort) => {
    return sort === currentSort;
  };

  return (
    <thead className={styles.header}>
      <tr>
        <th onClick={clickHandler('id')}>
          <span>ID</span>
          {isActive('id') && <img src={arrowIcon} alt='' />}
        </th>
        <th onClick={clickHandler('title')}>
          <span>Заголовок</span>
          {isActive('title') && <img src={arrowIcon} alt='' />}
        </th>
        <th onClick={clickHandler('body')}>
          <span>Описание</span>
          {isActive('body') && <img src={arrowIcon} alt='' />}
        </th>
      </tr>
    </thead>
  );
};
