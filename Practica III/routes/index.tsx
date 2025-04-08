import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";

const featuredBooks = [
  "To Kill a Mockingbird",
  "1984",
];

type Data = {
  docs: {
    cover_i: number;
    title: string;
    author_name: string[];
    key: string;
  }[];
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    try {
      const data: Data = {
        docs: [],
      };
      for (const book of featuredBooks) {
        const url = "https://openlibrary.org/search.json?q=" + book;
        const response = await axios.get<Data>(url);
        if (response.status !== 200) {
          return new Response("Book not found", { status: 404 });
        }
        const bookData = response.data.docs[0];
        const title = bookData.title;
        const author = bookData.author_name[0];
        const coverId = bookData.cover_i;

        const bookInfo = {
          title: title,
          author_name: [author],
          cover_i: coverId,
          key: bookData.key.replace("/works/", ""),
        };

        data.docs.push(bookInfo);
      }
      return ctx.render(data);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <h1>Featured Books</h1>
      <ul>
        {props.data.docs.map((book) => (
          <li key={book.key}>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
            />
            <h2>{book.title}</h2>
            <p>by {book.author_name.join(", ")}</p>
            <a href={`/book/${book.key}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
