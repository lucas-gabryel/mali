"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "O campo nome é obrigatório")
    .max(100, "O nome não pode ter mais de 100 caracteres")
    .refine((val) => val.split(" ").length > 1, {
      message: "Por favor, insira nome e sobrenome",
    }),

  address: z
    .string()
    .trim()
    .min(5, "O endereço está muito curto")
    .max(255)
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val) return true;
      const phoneRegex = /^\d{10,11}$/;
      return phoneRegex.test(val.replace(/\D/g, ""));
    }, "Informe um número de telefone válido (DDD + Número)")
    .transform((val) => val?.replace(/\D/g, "")),
});

interface ICreateClient {
  name: string;
  address?: string;
  phone?: string;
}

export default function ClientStep() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ICreateClient) => {
    console.log(data);
    router.push("/quote/new/item-step");
  };

  return (
    <div className="flex items-center justify-center pt-4 px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[50%] bg-white rounded-lg p-4"
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Selecione o Cliente</FieldLegend>
            <FieldDescription>
              Esse orçamento será para qual cliente?
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nome do cliente</FieldLabel>
                <Input
                  id="name"
                  autoComplete="off"
                  placeholder="José Roberto"
                  type="text"
                  {...register("name")}
                  className="bg-white"
                />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="address">Endereço</FieldLabel>
                <Input
                  id="address"
                  autoComplete="off"
                  placeholder="Rua Domingos Correia, nº 555"
                  type="text"
                  {...register("address")}
                  className="bg-white"
                />
                {errors.address && (
                  <FieldError>{errors.address.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Telefone</FieldLabel>
                <Input
                  id="phone"
                  autoComplete="off"
                  placeholder="(82) 98765-4321"
                  type="tel"
                  {...register("phone")}
                  className="bg-white"
                />
                {errors.phone && (
                  <FieldError>{errors.phone.message}</FieldError>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal" className="flex justify-end">
            <Button variant="outline" type="button" onClick={router.back}>
              Voltar
            </Button>
            <Button type="submit">Continuar</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
