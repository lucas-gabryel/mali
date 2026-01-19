"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./avatar";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function rederingProfile(router: AppRouterInstance, pathname: string) {
  if (pathname === "/" || pathname === "/cadastrar" || pathname === "/entrar")
    return null;

  const onLogout = () => {
    window.localStorage.setItem("token", "");
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem onClick={onLogout}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isRoot = pathname === "/";

  const buttonsData = [
    {
      id: "signin",
      type: "submit",
      variant: "default",
      onClick: () => router.push("/entrar"),
      children: "Entrar",
      visible: isRoot,
    },
    {
      id: "signup",
      type: "button",
      variant: "secondary",
      onClick: () => router.push("/cadastrar"),
      children: "Cadastrar",
      visible: isRoot,
    },
  ];

  const rederingButtons = buttonsData.filter(
    (button) => button.visible === true,
  );

  return (
    <div className="flex justify-between items-center p-4 bg-white w-full">
      <Link href={"/home"}>
        <h1 className="font-semibold">Mali</h1>
      </Link>
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
        {rederingProfile(router, pathname)}
      </div>
    </div>
  );
}
