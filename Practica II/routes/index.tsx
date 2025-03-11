import { FreshContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    if (name) {
      return new Response("", {
        status: 307,
        headers: { Location: `/personaje?name=${name}` },
      });
    }
    return ctx.render();
  },
};

const Home = () => {
  return (
    <div class="formularioInput">
      <form method="get">
        Introduce un nombre: <input type="text" name="name" />
        <button class="botonFormularioInput" type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default Home;
