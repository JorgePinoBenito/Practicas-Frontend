import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";

type Data = {
  name: string;
  biography: string;
  works: {
    title: string;
    key: string;
  }[];
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const { key } = ctx.params;
    /*Página con información sobre el autor:
https://openlibrary.org/authors/{id}.json
https://openlibrary.org/authors/{id}/works.json*/
    try {
      const works = [];

      const url = `https://openlibrary.org/authors/${key}.json`;
      const response = await axios.get<Data>(url);
      if (response.status !== 200) {
        return new Response("Author not found", { status: 404 });
      }
      const authorData = response.data;
      const name = authorData.name;
      const biography = authorData.biography || "No biography available";
      const authorKey = key;
      const worksUrl =
        `https://openlibrary.org/authors/${authorKey}/works.json`;
      const worksResponse = await axios.get(worksUrl);
      if (worksResponse.status !== 200) {
        return new Response("Works not found", { status: 404 });
      }
      const worksData = worksResponse.data.entries;
      for (const work of worksData) {
        const title = work.title;
        const key = work.key.replace("/works/", "");
        works.push({ title: title, key: key });
      }

      return ctx.render({
        name: name,
        biography: biography,
        works: works,
      });
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <h1>{props.data.name}</h1>
      <p>{props.data.biography}</p>
      <h2>Works</h2>
      <ul>
        {props.data.works.map((work) => (
          <li key={work.key}>
            <a href={`/book/${work.key}`}>{work.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
