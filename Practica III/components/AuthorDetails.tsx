import { FunctionalComponent } from "preact";
import { AuthorData } from "../types.ts";

type Props = {
  author: AuthorData;
};

const AuthorDetails: FunctionalComponent<Props> = ({ author }) => {
  return (
    <div class="index">
      <div class="BookDetails">
        <h1>{author.name}</h1>
        <p>{author.biography}</p>

        <h2>Trabajos</h2>
        <ul>
          {author.works.map((work) => (
            <li key={work.key}>
              <a href={`/book/${work.key}`}>{work.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuthorDetails;
