import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

type ModuloProps = {
  orden: number;
  texto: string;
};

const Modulo: FunctionComponent<ModuloProps> = (props) => {
  const [showModulo, setShowModulo] = useState<boolean>(false);
  const [newTextMod, setTextMod] = useState<string>(props.texto);

  return (
    <div class="container">
      <div class={`contenedorModulo ${showModulo ? "expanded" : ""}`}>
        <div class="tituloBotonMod">
          <div class="tituloModulo">
            <h2>Módulo {props.orden}</h2>
          </div>
          <div class="mostrarMasMenosModulo">
            <button
              type="button"
              class="btn"
              onClick={() => setShowModulo(!showModulo)}
            >
              <h2>Mostrar {showModulo ? "menos" : "más"}</h2>
            </button>
          </div>
        </div>

        {showModulo && (
          <div>
            <p class="parrafoModulo">
              {newTextMod}
              <br />
              <br />
            </p>
            <input
              class="input"
              type="text"
              name="ipsum"
              onChange={(e) =>
                setTextMod((prev) => prev + " " + e.currentTarget.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modulo;
