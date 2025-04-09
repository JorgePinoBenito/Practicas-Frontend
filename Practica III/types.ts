export type Author = {
  author: {
    key: string;
  };
};

export type BookData = {
  title: string;
  description?: string;
  created: {
    value: Date;
  };
  number_of_pages?: number;
  key: string;
  authors: Author[];
  covers: number[];
};

export type AuthorData = {
  name: string;
  biography?: string;
  works: {
    title: string;
    key: string;
  }[];
};

export type SearchData = {
  docs: {
    cover_i?: number;
    title: string;
    author_name: string[];
    key: string;
  }[];
};
