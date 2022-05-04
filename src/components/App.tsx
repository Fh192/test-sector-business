import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PostsPage } from '../pages/PostsPage/PostsPage';
import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path='/posts' element={<PostsPage />} />
        <Route path='*' element={<Navigate to='/posts' />} />
      </Routes>
    </div>
  );
};
