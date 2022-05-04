import React from 'react';
import { IPost } from '../../../types/posts';
import styles from './Post.module.scss';

export const Post: React.FC<IPost> = ({ id, title, body }) => {
  return (
    <tr className={styles.post}>
      <td>{id}</td>
      <td>{title}</td>
      <td>{body}</td>
    </tr>
  );
};
