export function formatarDateISO(dateISO: string): string {
  const data = new Date(dateISO);
  return new Intl.DateTimeFormat("pt-BR").format(data);
}

export function formatCurrency(value: string | number): string {
  const valueSanitized = Number(value);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueSanitized);
}
