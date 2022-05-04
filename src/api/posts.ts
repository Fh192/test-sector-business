import { IGetPosts, IGetPostsParams, IPost } from '../types/posts';
import { api } from './instance';

export const postsApi = {
  getPosts: async ({
    page = 1,
    limit = 10,
    sort = 'id',
    filter = '',
  }: IGetPostsParams): Promise<IGetPosts> => {
    const response = await api.get<IPost[]>(
      `/posts?q=${filter}&_sort=${sort}&_page=${page}&_limit=${limit}`
    );
    const totalCount = +response.headers['x-total-count'];

    return { posts: response.data, totalCount };
  },
};
