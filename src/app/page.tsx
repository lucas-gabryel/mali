import capa from "@/.public/capa.jpg";
import Image from "next/image";

export default function AppRoot() {
  return (
    <div>
      <Image
        src={capa}
        alt={"Imagem de uma pessoa olhando roupas dentro de uma mala"}
      />
    </div>
  );
}
