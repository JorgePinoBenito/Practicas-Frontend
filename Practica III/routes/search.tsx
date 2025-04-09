import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { SearchData } from "../types.ts";
import ListBooks from "../components/SearchForm.tsx";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, SearchData>) => {
    const url = new URL(req.url);
    const titulo = url.searchParams.get("titulo");
    if (titulo) {
      try {
        const apiUrl = "https://openlibrary.org/search.json?q=" + titulo;
        const response = await axios.get<SearchData>(apiUrl);

        if (response.status !== 200) {
          return new Response("Book not found", { status: 404 });
        }

        const bookData = response.data.docs.map((book) => ({
          title: book.title,
          author_name: book.author_name
            ? book.author_name
            : ["Autor desconocido"],
          cover_i: book.cover_i,
          key: book.key.replace("/works/", ""),
        }));

        return ctx.render({ docs: bookData });
      } catch (error) {
        console.error(error);
        return new Response("Error", { status: 500 });
      }
    }
    return ctx.render();
  },
};

const Page = (props: PageProps<SearchData>) => {
  return (
    <div class="tituloForm">
      <h1>Buscador de títulos</h1>

      <form method="get">
        <input
          type="text"
          name="titulo"
          placeholder="Introduce el título del libro"
        />
        <button type="submit">Buscar</button>
      </form>

      {props.data && <ListBooks books={props.data.docs} />}
    </div>
  );
};

export default Page;
