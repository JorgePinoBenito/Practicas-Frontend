import { FunctionComponent } from "preact/src/index.d.ts";

const Menu: FunctionComponent = () => {
  return (
    <div class="menu">
      <a href="/">Inicio</a>
      <a href="/search">Buscador de títulos</a>
    </div>
  );
};

export default Menu;
