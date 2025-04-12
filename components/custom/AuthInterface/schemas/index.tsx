import { z } from "zod";

export const authSchema = z.discriminatedUnion("isRegistering", [
  z.object({
    isRegistering: z.literal(true),
    firstName: z.string().min(1, "Nome é obrigatório"),
    lastName: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
    userType: z.enum(["COLLECTS_WASTE", "PRODUCES_WASTE"], {
      required_error: "Selecione um tipo de usuário",
    }),
  }),
  z.object({
    isRegistering: z.literal(false),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
  }),
]);
