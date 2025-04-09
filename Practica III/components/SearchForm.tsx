import { FunctionalComponent } from "preact";
import { SearchData } from "../types.ts";

type Props = {
  books: SearchData["docs"];
};

const ListBooks: FunctionalComponent<Props> = ({ books }) => {
  if (books.length === 0) {
    return <p>No se encontraron libros con ese título.</p>;
  }

  return (
    <div class="bookList">
      {books.map((book) => (
        <div key={book.key}>
          {book.cover_i && (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title ?? "Portada del libro"}
            />
          )}
          <h2>{book.title ?? "Sin título"}</h2>
          <p>por {book.author_name.join(", ")}</p>
          <a href={`/book/${book.key}`}>Ver detalles</a>
        </div>
      ))}
    </div>
  );
};

export default ListBooks;
