import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../../types.ts";

type Data = {
  post: Post;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const id = ctx.params.id;
    try {
      const response = await fetch(
        `https://back-p5-y0e1.onrender.com/api/posts/${id}`,
      );
      const data = await response.json();
      if (data.success) {
        const post = data.data;
        return ctx.render({ post });
      } else {
        return ctx.render();
      }
    } catch (_e) {
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<Data>) => {
  const post = props.data.post;
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post._id}</p>
      <img src={post.cover} alt={post.title} />
      <p>{post.content}</p>
      <p>Autor: {post.author}</p>
      <p>Likes: {post.likes}</p>
      <p>Comentarios:</p>
      <ul>
        {post.comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.author}</strong>: {comment.content}
          </li>
        ))}
      </ul>

      <p>Creado el: {new Date(post.createdAt).toLocaleString()}</p>
      <p>Actualizado el: {new Date(post.updatedAt).toLocaleString()}</p>
      <p>Version: {post.__v}</p>
    </div>
  );
};
export default Page;
