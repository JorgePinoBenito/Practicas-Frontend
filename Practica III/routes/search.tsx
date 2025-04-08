import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";

type Data = {
  docs: {
    cover_i: number;
    title: string;
    author_name: string[];
    key: string;
  }[];
};

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = new URL(req.url);
    const titulo = url.searchParams.get("titulo");
    if (titulo) {
      try {
        const apiUrl = "https://openlibrary.org/search.json?q=" + titulo;
        const response = await axios.get<Data>(apiUrl);

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

const Page = (props: PageProps<Data>) => {
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

      {props.data && (
        <>
          {props.data.docs.length === 0
            ? <p>No se encontraron libros con ese título.</p>
            : (
              <>
                {props.data.docs.map((book) => (
                  <div key={book.key}>
                    {book.cover_i && (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                        alt={book.title ?? "Portada del libro"}
                      />
                    )}
                    <h2>{book.title ?? "Sin título"}</h2>
                    <p>por {book.author_name}</p>
                    <a href={`/book/${book.key}`}>Ver detalles</a>
                  </div>
                ))}
              </>
            )}
        </>
      )}
    </div>
  );
};

export default Page;
