import { PageProps } from "$fresh/server.ts";
import Menu from "../components/Menu.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div>
      <Menu />
      <Component />
    </div>
  );
}
