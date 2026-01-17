import { object, string } from "zod";

export const SignupValidation = object({
  fullName: string(),
  username: string(),
  password: string(),
});
