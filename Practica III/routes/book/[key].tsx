import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";

type Author = {
  author: {
    key: string;
  };
};

type Data = {
  title: string;
  description: string;
  created: {
    value: Date;
  };
  npages: number;
  key: string;
  authors: Author[];
  covers: number[];
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const { key } = ctx.params;
    try {
      const url = `https://openlibrary.org/works/${key}.json`;
      const response = await axios.get<Data>(url);
      if (response.status !== 200) {
        return new Response("Book not found", { status: 404 });
      }
      const bookData = response.data;
      const title = bookData.title;
      const description = bookData.description
        ? bookData.description
        : "No description available";
      const created = bookData.created.value;
      const npages = bookData.npages || 0;
      const bookKey = bookData.key.replace("/works/", "");
      const authors = bookData.authors.map((author) => ({
        author: { key: author.author.key.replace("/authors/", "") },
      }));
      const covers = bookData.covers || [];

      const bookInfo = {
        title: title,
        description: description,
        created: { value: created },
        npages: npages,
        key: bookKey,
        authors: authors,
        covers: covers,
      };
      return ctx.render(bookInfo);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <div class="bookDetails">
      <h1>{props.data.title}</h1>
      <p>{props.data.description}</p>
      <p>Año de publicación: {props.data.created.value}</p>
      <p>Número de páginas: {props.data.npages}</p>
      {props.data.covers.map((cover) => {
        return (
          <img
            key={cover}
            src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}
            alt={props.data.title}
          />
        );
      })}
      <h2>Autor</h2>
      {props.data.authors.map((author) => {
        return (
          <div key={author.author.key}>
            <a href={`/author/${author.author.key}`}>{author.author.key}</a>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
