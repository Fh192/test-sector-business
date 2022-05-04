import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import { useDispatch, useSelector } from '../../hooks';
import { setFilter } from '../../store/reducers/postsSlice';
import styles from './PostsFilter.module.scss';

export const PostsFilter: React.FC = () => {
  const dispatch = useDispatch();

  const { filter } = useSelector(s => s.posts);
  const [newFilter, setNewFilter] = useState(filter);

  const filterChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFilter(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (newFilter !== filter) {
        dispatch(setFilter(newFilter));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch, newFilter, filter]);

  return (
    <div className={styles.filter}>
      <input
        className={styles.input}
        type='text'
        placeholder='Поиск'
        value={newFilter}
        onChange={filterChangeHandler}
      />
      <img src={searchIcon} alt='' />
    </div>
  );
};
