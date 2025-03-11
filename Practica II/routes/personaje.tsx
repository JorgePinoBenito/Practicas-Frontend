import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import Character from "../components/Personaje.tsx";

type Data = {
  count: number;
  next: null;
  previous: null;
  results: Result[];
};
type Result = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
};

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url2 = new URL(req.url);
    const name = url2.searchParams.get("name");

    const url = `https://swapi.dev/api/people/?search=${name}&format=json`;
    try {
      const response = await axios.get<Data>(url);
      return ctx.render(response.data);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<Data>) => {
  const data = props.data.results;

  if (data.length === 0) {
    return (
      <div class="mensajeError">
        <h2>No se ha encontrado el personaje</h2>
        <div>
          <a href="/">
            <button type="button" class="volverErr">
              Volver a la página de búsqueda
            </button>
          </a>
        </div>
      </div>
    );
  }

  const character = data[0];

  return (
    <div class="contenedorPersonajes">
      <h1>Resultado</h1>
      <div class="personaje">
        <Character
          name={character.name}
          height={character.height}
          mass={character.mass}
          hair_color={character.hair_color}
          skin_color={character.skin_color}
          eye_color={character.eye_color}
          birth_year={character.birth_year}
          gender={character.gender}
          homeworld={character.homeworld}
          films={character.films}
          species={character.species}
          vehicles={character.vehicles}
          starships={character.starships}
          created={character.created}
          edited={character.edited}
          url={character.url}
        />
      </div>
      <div>
        <a href="/">
          <button type="button" class="volver">
            Volver a la página de búsqueda
          </button>
        </a>
      </div>
    </div>
  );
};

export default Page;
