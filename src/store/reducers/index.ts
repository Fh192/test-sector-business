import postsReducer, { postsSlice } from './postsSlice';

export const rootReducer = {
  [postsSlice.name]: postsReducer,
};
