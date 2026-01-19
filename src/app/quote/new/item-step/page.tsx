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
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";
import ItemTable from "./item-table";

const schema = z.object({
  barcode: z
    .string()
    .trim()
    .min(1, "O campo código de barras é obrigatório")
    .max(50, "O código de barras não pode ter mais de 50 caracteres"),

  description: z
    .string()
    .trim()
    .max(100, "A descrição não pode ter mais de 100 caracteres")
    .optional()
    .or(z.literal("")),

  quantity: z.coerce
    .number("Informe um número válido")
    .int("A quantidade deve ser um número inteiro")
    .positive("A quantidade deve ser maior que zero")
    .max(1000, "A quantidade não pode ser maior que 1000"),

  price: z.coerce
    .number("Informe um número válido")
    .positive("O preço tem que ser maior que zero")
    .max(1000000000, "O preço não pode ser maior que R$ 1.000.000.000,00"),
});

export type ItemFormData = z.infer<typeof schema>;

export default function ItemStep() {
  const router = useRouter();
  const [items, setItems] = useState<ItemFormData[]>([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onAddItem = (data: ItemFormData) => {
    setItems((prev) => [...prev, data]);
    reset();
    
    const barcodeField = document.getElementById("barcode");
    barcodeField?.focus();
  };

  const onDeleteItem = (barcode: string) => {
    setItems((prev) => {
      return prev.filter((item) => item.barcode !== barcode);
    });
  };

  const handleFinalize = () => {
    if (items.length === 0) {
      alert("Adicione pelo menos um item.");
      return;
    }
    console.log("Lista Completa para API:", items);
    const response = "um id do orçamento";
    router.push(`/quote/${response}`);
  };

  return (
    <div className="grid grid-cols-2">
      <form
        onSubmit={handleSubmit(onAddItem)}
        className="bg-white rounded-lg p-4 m-4"
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Adicione os itens</FieldLegend>
            <FieldDescription>
              Coloque os itens que vão para o orçamento.
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="barcode">Código de barras</FieldLabel>
                <Input
                  id="barcode"
                  placeholder="Escaneie ou digite o código"
                  type="text"
                  {...register("barcode")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      const priceField = document.getElementById("price");
                      priceField?.focus();
                    }
                  }}
                />
                {errors.barcode && (
                  <FieldError>{errors.barcode.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="description">
                  Nome ou descrição do produto
                </FieldLabel>
                <Input
                  id="description"
                  placeholder="Camiseta Polo Azul Tamanho G"
                  type="text"
                  {...register("description")}
                />
                {errors.description && (
                  <FieldError>{errors.description.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="quantity">Quantidade</FieldLabel>
                <Input
                  id="quantity"
                  placeholder="1"
                  defaultValue={1}
                  type="number"
                  {...register("quantity")}
                />
                {errors.quantity && (
                  <FieldError>{errors.quantity.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="price">Preço unitário</FieldLabel>
                <Controller
                  name="price"
                  control={control}
                  render={({ field: { onChange, name, value } }) => (
                    <NumericFormat
                      customInput={Input}
                      id="price"
                      name={name}
                      value={(value as string | number) ?? ""}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      decimalScale={2}
                      allowNegative={false}
                      placeholder="R$ 0,00"
                      onValueChange={(values) => {
                        onChange(values.floatValue);
                      }}
                    />
                  )}
                />
                {errors.price && (
                  <FieldError>{errors.price.message}</FieldError>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal" className="flex justify-end">
            <Button variant="outline" type="button" onClick={router.back}>
              Voltar
            </Button>
            <Button type="submit">Adicionar item</Button>
          </Field>
        </FieldGroup>
      </form>
      <div className="flex bg-white rounded-lg p-4 m-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <CircleAlert size={40} />
            <h1 className="text-2xl font-semibold">Orçamento vazio</h1>
            <p>Adicione itens para poder salvar o orçamento</p>
          </div>
        ) : (
          <div className="w-full">
            <ItemTable items={items} onDelete={onDeleteItem} />
            <Button
              type="button"
              className="w-full text-white mt-4"
              onClick={handleFinalize}
            >
              Finalizar Orçamento
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
