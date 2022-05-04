export interface IPost {
  id: number;
  title: string;
  body: string;
}

export type ISort = 'id' | 'title' | 'body';

export interface IGetPostsParams {
  sort: ISort;
  page: number;
  limit: number;
  filter: string;
}

export interface IGetPosts {
  posts: IPost[];
  totalCount: number;
}
