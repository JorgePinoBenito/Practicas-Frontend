export type ApiFetchResponse = {
  success: boolean;
  data: {
    posts: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
  cover: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Comment = {
  author: string;
  content: string;
  createdAt: string;
  _id: string;
};
