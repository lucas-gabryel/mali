"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function Header() {
  const router = useRouter();

  const buttonsData = [
    {
      id: "signin",
      type: "submit",
      variant: "default",
      onClick: () => router.push("/entrar"),
      children: "Entrar",
      visible: window.location.pathname !== '/home',
    },
    {
      id: "signup",
      type: "button",
      variant: "secondary",
      onClick: () => router.push("/cadastrar"),
      children: "Cadastrar",
      visible: window.location.pathname !== '/home',
    },
    {
      id: "newQuote",
      type: "button",
      variant: "default",
      onClick: () => router.push("/"),
      children: "Novo orçamento",
      visible: window.location.pathname === '/home',
    },
  ];

  const rederingButtons = buttonsData.filter(
    (button) => button.visible === true
  );

  return (
    <div className="flex justify-between items-center p-4 bg-white">
      <h1 className="font-semibold">Mali</h1>
      <div className="flex gap-2">
        {rederingButtons.map((button) => {
          return (
            <Button
              key={button.id}
              id={button.id}
              type={button.type as "submit" | "button" | "reset" | undefined}
              variant={
                button.variant as
                  | "default"
                  | "destructive"
                  | "outline"
                  | "secondary"
                  | "ghost"
                  | "link"
                  | null
                  | undefined
              }
              onClick={button.onClick}
            >
              {button.children}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
