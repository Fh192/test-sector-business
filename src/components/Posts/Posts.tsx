import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from '../../hooks';
import { Header } from './Header/Header';
import { Post } from './Post/Post';
import styles from './Posts.module.scss';

export const Posts: React.FC = () => {
  const cx = classNames.bind(styles);
  const { posts, fetching } = useSelector(s => s.posts);

  return (
    <table className={cx('posts', { fetching })}>
      <Header />
      <tbody className={styles.list}>
        {posts.map(post => (
          <Post {...post} key={post.id} />
        ))}
      </tbody>
    </table>
  );
};
