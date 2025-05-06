import { useState } from "preact/hooks";
import { FunctionalComponent } from "preact/src/index.d.ts";

type Error = {
  error: boolean;
  message: string;
};

const AddForm: FunctionalComponent = () => {
  const [titulo, setTitulo] = useState<string>("");
  const [cover, setCover] = useState<string>("");
  const [contenido, setContenido] = useState<string>("");
  const [autor, setAutor] = useState<string>("");

  return (
    <div>
      <form method="POST" action="/post/create" class="AddForm">
        <input
          type="text"
          name="titulo"
          placeholder="Titulo"
          value={titulo}
          required
          min={5}
          max={100}
          onInput={(e) => {
            const newValue = e.currentTarget.value;
            setTitulo(newValue);
          }}
        />
        <input
          type="text"
          name="contenido"
          placeholder="Contenido"
          value={contenido}
          required
          min={10}
          max={100}
          onInput={(e) => {
            const newValue = e.currentTarget.value;
            setContenido(newValue);
          }}
        />

        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={autor}
          required
          min={2}
          max={100}
          onInput={(e) => {
            const newValue = e.currentTarget.value;
            setAutor(newValue);
          }}
        />
        <input
          type="text"
          name="cover"
          placeholder="URL de la imagen"
          value={cover}
          required
          min={5}
          max={100}
          onInput={(e) => {
            const newValue = e.currentTarget.value;
            setCover(newValue);
          }}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default AddForm;
