import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { SearchData } from "../types.ts";
import FeaturedBooks from "../components/FeaturedBooks.tsx";

const featuredBooks = [
  "To Kill a Mockingbird",
  "1984",
  "The Great Gatsby",
  "Pride and Prejudice",
  "The Hobbit",
  "Moby-Dick",
  "Jane Eyre",
  "War and Peace",
  "The Catcher in the Rye",
  "Brave New World",
  "The Lord of the Rings",
  "Crime and Punishment",
  "The Alchemist",
  "The Picture of Dorian Gray",
  "Harry Potter and the Sorcerer's Stone",
];

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, SearchData>) => {
    try {
      const data: SearchData = {
        docs: [],
      };
      for (const book of featuredBooks) {
        const url = "https://openlibrary.org/search.json?q=" + book;
        const response = await axios.get<SearchData>(url);
        if (response.status !== 200) {
          return new Response("Libro no encontrado", { status: 404 });
        }
        const bookData = response.data.docs[0];
        const title = bookData.title;
        const author = bookData.author_name
          ? bookData.author_name
          : ["Autor desconocido"];
        const cover_i = bookData.cover_i ? bookData.cover_i : undefined;

        const bookInfo = {
          title: title,
          author_name: author,
          cover_i: cover_i,
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

const Page = (props: PageProps<SearchData>) => {
  return <FeaturedBooks books={props.data.docs} />;
};

export default Page;
