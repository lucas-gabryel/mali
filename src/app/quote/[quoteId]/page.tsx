"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import ItemTable from "../new/item-step/item-table";

export default function Quote() {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const item = [
    {
      barcode: "123456",
      description: "oi",
      quantity: 1,
      price: 123,
    },
  ];
  const quoteId = 1;
  const clientId = 1;

  return (
    <div className="p-4 m-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/home")}>
            <ArrowLeft />
          </Button>
          <p className="">Orçamento {quoteId}</p>
        </div>
        <Link href={`/client/${clientId}`}>
          <Card>
            <CardContent className="flex py-2 px-4 gap-2">
              <p>Cliente: </p>
              <p className="font-medium">Lucas Santos</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <div className="bg-white rounded-lg">
        <ItemTable items={item} onDelete={() => {}} />
      </div>
    </div>
  );
}
