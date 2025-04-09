import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { AuthorData } from "../../types.ts";
import AuthorDetails from "../../components/AuthorDetails.tsx";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, AuthorData>) => {
    const { key } = ctx.params;
    try {
      const works = [];

      const url = `https://openlibrary.org/authors/${key}.json`;
      const response = await axios.get<AuthorData>(url);
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

const Page = (props: PageProps<AuthorData>) => {
  return <AuthorDetails author={props.data} />;
};

export default Page;
