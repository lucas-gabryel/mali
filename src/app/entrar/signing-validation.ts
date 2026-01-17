import * as z from "zod";

export const SigninValidation = z.object({
  username: z.string().min(3),
  password: z.string(),
});
