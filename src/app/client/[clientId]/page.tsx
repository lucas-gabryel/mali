"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatarDateISO, formatCurrency } from "@/utils/formaters";
import GetBadge from "@/utils/get-badge";
import Link from "next/link";

function SummaryItem({ label, value }: { label: string; value: number }) {
  if (value <= 0) return null;

  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-3xl font-semibold`}>{formatCurrency(value)}</p>
    </div>
  );
}

export default function Client() {
  const data = [
    {
      id: "ab98df30-a1f9-475f-bf6d-cbd19c8a960e",
      name: "Cleide Santos",
      totalAmount: 604.0,
      status: "OPEN",
      createdAt: "2025-12-22 18:04:31.947",
      client_id: "375f4328-8c16-42f3-a048-cfa7b9e604bf",
    },
    {
      id: "ab98df30-a1f9-475f-bf6d-cbd19c8a960f",
      name: "Cleide Santos",
      totalAmount: 598.24,
      status: "OPEN",
      createdAt: "2025-12-22 18:04:31.947",
      client_id: "375f4328-8c16-42f3-a048-cfa7b9e604bf",
    },
    {
      id: "ab98df30-a1f9-475f-bf6d-cbd19c8a960g",
      name: "Cleide Santos",
      totalAmount: 598.24,
      status: "OPEN",
      createdAt: "2025-12-22 18:04:31.947",
      client_id: "375f4328-8c16-42f3-a048-cfa7b9e604bf",
    },
    {
      id: "ab98df30-a1f9-475f-bf6d-cbd19c8a960h",
      name: "Cleide Santos",
      totalAmount: 598.24,
      status: "PAID",
      createdAt: "2025-12-22 18:04:31.947",
      client_id: "375f4328-8c16-42f3-a048-cfa7b9e604bf",
    },
    {
      id: "ab98df30-a1f9-475f-bf6d-cbd19c8a960i",
      name: "Cleide Santos",
      totalAmount: 598.24,
      status: "CLOSE",
      createdAt: "2025-12-22 18:04:31.947",
      client_id: "375f4328-8c16-42f3-a048-cfa7b9e604bf",
    },
  ];

  const totalOpen = data.reduce(
    (acc, item) => (item.status === "OPEN" ? acc + item.totalAmount : acc),
    0,
  );

  const totalClose = data.reduce(
    (acc, item) => (item.status === "CLOSE" ? acc + item.totalAmount : acc),
    0,
  );

  const totalPago = data.reduce(
    (acc, item) => (item.status === "PAID" ? acc + item.totalAmount : acc),
    0,
  );

  const quoteId = 1;

  return (
    <div className="p-4">
      <Card>
        <CardContent className="flex justify-between items-center pt-5">
          <div className="flex items-center gap-8">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-3xl">AB</AvatarFallback>
            </Avatar>
            <p className="text-4xl font-semibold">Alberto Barros</p>
          </div>
          <div className="flex gap-12">
            <SummaryItem label="Em orçamento" value={totalOpen} />
            <SummaryItem label="Para pagar" value={totalClose} />
            <SummaryItem label="Pago" value={totalPago} />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-2 pt-2">
        {data.map((quote) => {
          return (
            <Link key={quote.id} href={`/quote/${quoteId}`}>
              <Card>
                <CardContent className="flex justify-between p-4">
                  <div>
                    {GetBadge(quote.status)}
                    <p className="text-sm mt-2">
                      {formatarDateISO(quote.createdAt)}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatCurrency(quote.totalAmount)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
