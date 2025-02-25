import Modulo from "../islands/Modulo.tsx";

export default function Home() {
  const texto1 =
    "Curabitur eget lorem sed odio pulvinar gravclassa quis quis ante. Phasellus et neque mattis, porttitor massa eget, finibus dolor. Vestibulum blandit pellentesque risus quis bibendum. Morbi euismod nunc eget varius elementum. Suspendisse ut ultricies purus. Nulla quis ultricies tellus. Vivamus eleifend elit tortor, in cursus erat cursus class. Mauris auctor leo lorem, class fermentum purus condimentum sed. Proin in erat congue, convallis massa eu, laoreet augue. Ut eleifend lectus nec semper vehicula. Aliquam a dui turpis. Aliquam vel varius quam. ";

  const texto2 =
    "Vivamus aliquet, erat quis pretium interdum, lectus lectus ultrices turpis, sit amet laoreet nisi ex eu sem. Vestibulum a porta magna, eu mattis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis ultricies leo sed ligula ultrices tempus. Nam non sapien commodo, interdum tellus et, varius nunc. Integer finibus lectus a nisl suscipit, vitae consequat nisl ullamcorper. Aenean consectetur nisl quis mi blandit, sed rutrum nunc rhoncus.";

  const texto3 =
    "Morbi accumsan est id malesuada blandit. Phasellus placerat ligula elit, sed ullamcorper tellus pretium eu. Donec nisl sapien, sodales vitae ex a, imperdiet sollicitudin metus. Donec finibus nisl at est auctor placerat eget sit amet metus. In porttitor consectetur enim consectetur sagittis. Nulla facilisi. Sed tincidunt, turpis eu finibus suscipit, nisl massa luctus velit, nec pretium lectus lacus eu magna. Duis quis arcu accumsan, sagittis lacus quis, elementum mauris. Phasellus sed placerat turpis, a lobortis nisl. Nunc tincidunt arcu ac tellus tempor vulputate. Pellentesque imperdiet tellus id nibh rhoncus porta. Donec pharetra sapien mauris, sed tempus turpis blandit ac. Duis dapibus luctus dolor. In quam odio, venenatis nec auctor ultrices, faucibus sit amet est. Proin non hendrerit enim, a sodales nisl.";

  return (
    <div>
      <Modulo orden={1} texto={texto1} />
      <Modulo orden={2} texto={texto2} />
      <Modulo orden={3} texto={texto3} />
    </div>
  );
}
