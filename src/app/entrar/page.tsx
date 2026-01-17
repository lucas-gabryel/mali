"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
import { SigninValidation } from "./signing-validation";

interface ISigningForm {
  username: string;
  password: string;
}

export default function Signin() {
  const { register, handleSubmit } = useForm<ISigningForm>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit: SubmitHandler<ISigningForm> = async (data) => {
    try {
      setLoading(true);
      SigninValidation.parse(data);
      const response = await axios.post(
        "http://localhost:8080/user/login",
        data
      );
      window.localStorage.setItem("token", response.data.token);
      router.push("/home");
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.message);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-600 w-svw h-svh flex justify-center items-center">
      <div className="bg-slate-50 rounded-lg p-4 w-96">
        <FieldSet>
          <FieldLegend>Entrar</FieldLegend>
          <FieldDescription>
            Digite suas credenciais para acessar a Mali
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                autoComplete="off"
                placeholder="Digite seu username"
                type="text"
                {...register("username")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                id="password"
                autoComplete="off"
                placeholder="Digite sua senha"
                type="password"
                {...register("password")}
              />
            </Field>

            <Button id="signin" type="submit" onClick={handleSubmit(submit)}>
              {loading ? <Spinner /> : "Entrar"}
            </Button>
            <Button
              id="signin"
              type="submit"
              variant={"secondary"}
              onClick={() => router.push("/cadastrar")}
            >
              Cadastrar
            </Button>
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  );
}
