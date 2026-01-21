"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatarDateISO, formatCurrency } from "../../utils/formaters";
import GetBadge from "../../utils/get-badge";

interface Client {
  id: string;
  name: string;
}

export interface QuoteResponse {
  id: string;
  client: Client;
  totalAmount: string;
  status: string;
  createdAt: string;
}

/* const mockData = [
  {
    id: "ab98df30-a1f9-475f-bf6d-cbd19c8a960e",
    name: "Cleide Santos",
    totalAmount: "598.24",
    status: "OPEN",
    createAt: "2025-12-22 18:04:31.947",
    client_id: "375f4328-8c16-42f3-a048-cfa7b9e604bf",
  },
  {
    id: "ab98df30-a1f9-475f-bf6d-cbd19c8a960a",
    name: "Lucas Gabryel Santos",
    totalAmount: "598.24",
    status: "OPEN",
    createAt: "2025-12-21 18:04:31.947",
    client_id: "375f4328-8c16-42f3-a048-cfa7b9e604ba",
  },
  {
    id: "ab98df30-a1f9-475f-bf6d-cbd19c8a960a",
    name: "Lucas Gabryel Nascimento Santos Oliveira",
    totalAmount: "598.24",
    status: "OPEN",
    createAt: "2025-12-19 18:04:31.947",
    client_id: "375f4328-8c16-42f3-a048-cfa7b9e604ba",
  },
]; */

function obterIniciais(nomeCompleto: string): string {
  const partes = nomeCompleto.trim().split(/\s+/);

  if (partes.length === 0) return "";

  const primeiroNome = partes[0];
  const ultimoNome = partes[partes.length - 1];

  const primeiraLetra = primeiroNome[0].toUpperCase();
  const ultimaLetra = ultimoNome[0].toUpperCase();

  return `${primeiraLetra}${ultimaLetra}`;
}

export default function Home() {
  const [data, setData] = useState<QuoteResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function loadData(userId: string, token: string) {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/budget/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const token = window.localStorage.getItem("token") || "";

  useEffect(() => {
    loadData("9140c097-ef4c-498b-a402-8ee906390579", token);
  }, [token]);

  console.log(data);

  return (
    <div className="bg-slate-100 w-full flex-1">
      {/* <Header /> */}
      <div className="flex justify-between items-center pt-4 px-8">
        <div>
          <p>Bem-vindo,</p>
          <h1 className="text-2xl font-semibold">User User!</h1>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => router.push("/quote/new/client-step")}
          >
            Baixar Orçamento
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/quote/new/client-step")}
          >
            Novo Orçamento
          </Button>
        </div>
      </div>
      {/* <Dialog>
        <DialogTrigger asChild>
          <Button>Novo Orçamento</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Criar novo Orçamento</DialogTitle>
            <DialogDescription>
              Informe o cliente para criar um novo orçamento
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-4 gap-4 pt-6 px-8">
          {data.map((quote) => {
            return (
              <Link key={quote.id} href={"/"}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>
                            {obterIniciais(quote.client.name)}
                          </AvatarFallback>
                        </Avatar>
                        <p>{quote.client.name}</p>
                      </div>
                      <p className="font-medium">
                        {formatCurrency(quote.totalAmount)}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex gap-2">
                    {GetBadge(quote.status)}
                    <p className="text-sm">
                      {formatarDateISO(quote.createdAt)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
