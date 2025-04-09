import { FunctionalComponent } from "preact";
import { SearchData } from "../types.ts";

type Props = {
  books: SearchData["docs"];
};

const FeaturedBooks: FunctionalComponent<Props> = ({ books }) => {
  return (
    <div>
      <h1>Libros destacados</h1>
      <div class="index">
        {books.map((book) => (
          <div class="grid-element" key={book.key}>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
            />
            <h2>{book.title}</h2>
            <p>by {book.author_name.join(", ")}</p>
            <a href={`/book/${book.key}`}>Ver detalles</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBooks;
