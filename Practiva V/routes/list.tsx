import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { Post } from "../types.ts";
import ListPosts from "../islands/ListPosts.tsx";
import { ApiFetchResponse } from "../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, ApiFetchResponse>) => {
    const url = "https://back-p5-y0e1.onrender.com/api/posts/";

    try {
      const response = await axios.get<ApiFetchResponse>(url);
      if (response.status !== 200) {
        return new Response("Error", { status: response.status });
      }

      const data = response.data.data.posts;
      const total = response.data.data.total;
      const page = response.data.data.page;
      const limit = response.data.data.limit;
      const totalPages = response.data.data.totalPages;
      const posts: Post[] = data.map((post: Post) => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        author: post.author,
        cover: post.cover,
        likes: post.likes,
        comments: post.comments,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        __v: post.__v,
      }));

      const responseObject: ApiFetchResponse = {
        success: true,
        data: {
          posts: posts,
          total: total,
          page: page,
          limit: limit,
          totalPages: totalPages,
        },
      };
      return ctx.render(responseObject);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<ApiFetchResponse>) => {
  const data = props.data;
  return <ListPosts posts={data} />;
};

export default Page;
