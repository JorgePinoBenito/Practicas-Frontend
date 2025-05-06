import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import AddForm from "../../islands/AddForm.tsx";

type Data = {
  added: boolean;
  _id: string;
};

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const formData = await req.formData();
    const titulo = formData.get("titulo")?.toString() || "";
    const cover = formData.get("cover")?.toString() || "";
    const contenido = formData.get("contenido")?.toString() || "";
    const autor = formData.get("autor")?.toString() || "";

    if (
      titulo && titulo?.length > 0 && cover && cover?.length > 0 && contenido &&
      contenido?.length > 0 && autor && autor?.length > 0
    ) {
      try {
        const userData = {
          title: titulo,
          content: contenido,
          author: autor,
          cover: cover,
        };

        const response = await fetch(
          `https://back-p5-y0e1.onrender.com/api/posts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          },
        );

        const data = await response.json();
        if (data.success) {
          return ctx.render({ added: true, _id: data.data._id });
        } else {
          return ctx.render({ added: false, _id: "" });
        }
      } catch (error) {
        console.error(error);
        return new Response("Error", { status: 500 });
      }
    }
    return ctx.render({ added: false, _id: "" });
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <>
      <AddForm />
      {props.data?.added && <p>Creado con ID {props.data._id}</p>}
    </>
  );
};

export default Page;
