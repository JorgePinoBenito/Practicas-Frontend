import { FunctionalComponent } from "preact";
import { SearchData } from "../types.ts";

type Props = {
  books: SearchData["docs"];
};

const FeaturedBooks: FunctionalComponent<Props> = ({ books }) => {
  return (
    <div class="index">
      <h1>Featured Books</h1>
      <ul>
        {books.map((book) => (
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

export default FeaturedBooks;
