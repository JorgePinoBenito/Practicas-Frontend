import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";

type Data = {
  title: string;
  description: string;
  created: {
    value: Date;
  };
  npages: number;
  key: string;
  authors: {
    key: string;
  }[];
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const { key } = ctx.params;
    console.log(key);
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
      const authors = Array.isArray(bookData.authors)
        ? bookData.authors
          .filter((author) => author.key) // Ensure author.key exists
          .map((author) => {
            return { key: author.key.replace("/authors/", "") };
          })
        : [];

      authors.map((author) => {
        console.log(author);
      });

      const bookInfo = {
        title: title,
        description: description,
        created: { value: created },
        npages: npages,
        key: bookKey,
        authors: authors,
      };
      //map y console log de author key
      authors.map((author) => {
        console.log(author.key);
      });
      return ctx.render(bookInfo);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <h1>{props.data.title}</h1>
      <p>{props.data.description}</p>
      <p>Año de publicación: {props.data.created.value}</p>
      <p>Número de páginas: {props.data.npages}</p>
      <img
        src={`https://covers.openlibrary.org/b/id/${props.data.key}-L.jpg`}
        alt={props.data.title}
      />
      <h2>Autor</h2>
      {props.data.authors.map((author) => {
        return (
          <div key={author.key}>
            <a href={`/author/${author.key}`}>{author.key}</a>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
