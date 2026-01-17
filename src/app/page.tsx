import capa from "@/.public/capa.jpg";
import Header from "@/components/ui/header";
import Image from "next/image";

export default function AppRoot() {
  return (
    <div>
      <Header />
      <Image
        src={capa}
        alt={"Imagem de uma pessoa olhando roupas dentro de uma mala"}
      />
    </div>
  );
}
