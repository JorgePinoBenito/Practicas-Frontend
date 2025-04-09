import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { BookData } from "../../types.ts";
import BookDetails from "../../components/BookDetails.tsx";

type Pages = {
  entries: {
    number_of_pages: number;
  }[];
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, BookData>) => {
    const { key } = ctx.params;
    try {
      const url = `https://openlibrary.org/works/${key}.json`;
      const response = await axios.get<BookData>(url);
      if (response.status !== 200) {
        return new Response("Libro no encontrado", { status: 404 });
      }
      const bookData = response.data;
      const title = bookData.title;
      const description = bookData.description
        ? bookData.description
        : "No hay descripción disponible";
      const created = bookData.created.value;

      const editionsUrl = `https://openlibrary.org/works/${key}/editions.json`;
      const editionsResponse = await axios.get<Pages>(editionsUrl);
      const editions = editionsResponse.data.entries;

      const firstWithPages = editions.find((e) => e.number_of_pages);
      const number_of_pages = firstWithPages
        ? firstWithPages.number_of_pages
        : undefined;

      const bookKey = bookData.key.replace("/works/", "");
      const authors = bookData.authors.map((author) => ({
        author: { key: author.author.key.replace("/authors/", "") },
      }));
      const covers = bookData.covers || [];

      const bookInfo = {
        title: title,
        description: description,
        created: { value: created },
        number_of_pages: number_of_pages,
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

const Page = (props: PageProps<BookData>) => {
  return <BookDetails book={props.data} />;
};

export default Page;
