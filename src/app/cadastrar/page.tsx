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
import { ZodError } from "zod";
import { SignupValidation } from "./signup-validation";

interface ISignupForm {
  fullName: string;
  username: string;
  password: string;
}

export default function Singnup() {
  const { register, handleSubmit } = useForm<ISignupForm>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit: SubmitHandler<ISignupForm> = async (data) => {
    try {
      setLoading(true);
      SignupValidation.parse(data);
      await axios.post("http://localhost:8080/user", data);
      router.push("/entrar");
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.message);
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
          <FieldLegend>Cadastre-se</FieldLegend>
          <FieldDescription>
            Digite seus dados para se cadastrar na Mali.
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName">Nome completo</FieldLabel>
              <Input
                id="fullName"
                autoComplete="off"
                placeholder="Digite seu nome"
                type="text"
                {...register("fullName")}
              />
            </Field>
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
              {loading ? <Spinner /> : "Cadastrar"}
            </Button>
            <Button
              id="signin"
              type="submit"
              variant={"secondary"}
              onClick={() => router.push("/entrar")}
            >
              Entrar
            </Button>
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  );
}
