import { FunctionalComponent } from "preact";
import { AuthorData } from "../types.ts";

type Props = {
  author: AuthorData;
};

const AuthorDetails: FunctionalComponent<Props> = ({ author }) => {
  return (
    <div class="AuthorDetails">
      <h1>{author.name}</h1>
      <p>{author.biography}</p>

      <h2>Trabajos</h2>
      <div class="AuthorWorks">
        {author.works.map((work) => (
          <a class="WorkCard" href={`/book/${work.key}`}>{work.title}</a>
        ))}
      </div>
    </div>
  );
};

export default AuthorDetails;
