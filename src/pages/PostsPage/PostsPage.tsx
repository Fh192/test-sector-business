import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { Posts } from '../../components/Posts/Posts';
import { PostsFilter } from '../../components/PostsFilter/PostsFilter';
import { useDispatch, useSelector } from '../../hooks';
import { getPosts, setCurrentPage } from '../../store/reducers/postsSlice';
import styles from './PostsPage.module.scss';

export const PostsPage: React.FC = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const { currentPage, filter, sort, totalPages } = useSelector(s => s.posts);

  useEffect(() => {
    const page = Math.min(
      Math.max(1, Number(searchParams.get('page'))),
      totalPages
    );

    if (page !== currentPage) {
      dispatch(setCurrentPage(page));
    }
  }, [dispatch, currentPage, searchParams, totalPages]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentPage, filter, sort]);

  return (
    <div className={styles.postsPage}>
      <div className={styles.inner}>
        <PostsFilter />
        <Posts />
        <Pagination />
      </div>
    </div>
  );
};
