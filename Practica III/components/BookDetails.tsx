import { FunctionalComponent } from "preact";
import { BookData } from "../types.ts";

type Props = {
  book: BookData;
};

const BookDetails: FunctionalComponent<Props> = ({ book }) => {
  return (
    <div class="BookDetails">
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>Año de publicación: {new Date(book.created.value).getFullYear()}</p>
      <p>Número de páginas: {book.number_of_pages}</p>

      <div className="BookImages">
        {book.covers.map((cover) => (
          <img
            key={cover}
            src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}
            alt={book.title}
          />
        ))}
      </div>

      <h2>Autor</h2>
      {book.authors.map((author) => (
        <div key={author.author.key}>
          <a href={`/author/${author.author.key}`}>{author.author.key}</a>
        </div>
      ))}
    </div>
  );
};

export default BookDetails;
