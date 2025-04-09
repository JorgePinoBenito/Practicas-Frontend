import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { BookData } from "../../types.ts";
import BookDetails from "../../components/BookDetails.tsx";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, BookData>) => {
    const { key } = ctx.params;
    try {
      const url = `https://openlibrary.org/works/${key}.json`;
      const response = await axios.get<BookData>(url);
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

const Page = (props: PageProps<BookData>) => {
  return <BookDetails book={props.data} />;
};

export default Page;
