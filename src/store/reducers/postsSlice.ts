import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { postsApi } from '../../api/posts';
import { IGetPosts, IPost, ISort } from '../../types/posts';

interface State {
  posts: IPost[];
  sort: ISort;
  filter: string;
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  fetching: boolean;
}

const initialState: State = {
  posts: [],
  sort: 'id',
  filter: '',
  currentPage: 1,
  limit: 10,
  totalCount: 0,
  totalPages: 1,
  fetching: false,
};

export const getPosts = createAsyncThunk<IGetPosts, void, { state: RootState }>(
  'posts/getPosts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { currentPage, limit, filter, sort } = getState().posts;
      const { posts, totalCount } = await postsApi.getPosts({
        page: currentPage,
        limit,
        filter,
        sort,
      });

      return { posts, totalCount };
    } catch {
      return rejectWithValue('handler error here');
    }
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },

    setSort: (state, action: PayloadAction<ISort>) => {
      state.sort = action.payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getPosts.fulfilled, (state, action) => {
      const { posts, totalCount } = action.payload;

      state.posts = posts;
      state.totalCount = totalCount;
      state.totalPages = Math.ceil(totalCount / state.limit);
      state.fetching = false;
    });

    addCase(getPosts.pending, state => {
      state.fetching = true;
    });
  },
});

export const { setSort, setCurrentPage, setFilter } = postsSlice.actions;
export default postsSlice.reducer;
