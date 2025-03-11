import { FunctionComponent } from "preact";

type PersonajeProps = {
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

const Personaje: FunctionComponent<PersonajeProps> = (props) => {
  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    films,
    species,
    vehicles,
    starships,
    created,
    edited,
    url,
  } = props;
  return (
    <>
      <ul>
        <li>Nombre: {name}</li>
        <li>Altura: {height}</li>
        <li>Peso: {mass}</li>
        <li>Color de pelo: {hair_color}</li>
        <li>Color de piel: {skin_color}</li>
        <li>Color de ojos: {eye_color}</li>
        <li>Año de nacimiento: {birth_year}</li>
        <li>Genero: {gender}</li>
        <li>
          <a href={homeworld}>Planeta de origen</a>
        </li>

        <li>
          Peliculas:
          <ul>
            {films.map((film, index) => (
              <li key={index}>
                <a href={film}>{film}</a>
              </li>
            ))}
          </ul>
        </li>

        <li>Especies: {species}</li>

        <li>
          Vehiculos
          <ul>
            {vehicles.map((vehicle, index) => (
              <li key={index}>
                <a href={vehicle}>{vehicle}</a>
              </li>
            ))}
          </ul>
        </li>

        <li>
          Naves estelares
          <ul>
            {starships.map((starship, index) => (
              <li key={index}>
                <a href={starship}>{starship}</a>
              </li>
            ))}
          </ul>
        </li>

        <li>Fecha de creacion: {created}</li>
        <li>Fecha de edicion: {edited}</li>

        <li>
          URL
          <ul>
            <li>
              <a href={url}>{url}</a>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default Personaje;
