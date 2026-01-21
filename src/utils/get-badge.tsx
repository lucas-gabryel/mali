import { Badge } from "@/components/ui/badge";
import { ReactElement } from "react";

export default function GetBadge(status: string): ReactElement {
  switch (status) {
    case "OPEN":
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
          Aberto
        </Badge>
      );
    case "CLOSE":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">
          Aguardando Pagamento
        </Badge>
      );
    case "PAID":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
          Pago
        </Badge>
      );
    default:
      return <></>;
  }
}
