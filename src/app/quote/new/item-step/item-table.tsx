"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash } from "lucide-react";
import { ItemFormData } from "./page";
import { formatCurrency } from "@/utils/formaters";

export default function ItemTable({
  items,
  onDelete,
}: {
  items: ItemFormData[];
  onDelete: (barcode: string) => void;
}) {
  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-40">Código de barras</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead className="w-20">Quantidade</TableHead>
          <TableHead className="w-32 text-end">Valor unitário</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item: ItemFormData) => (
          <TableRow key={item.barcode}>
            <TableCell>{item.barcode}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className="text-center">{item.quantity}</TableCell>
            <TableCell className="text-end">{formatCurrency(item.price)}</TableCell>
            <TableCell className="flex justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onDelete(item.barcode)}
                  >
                    <Trash />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Excluir</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{formatCurrency(total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
