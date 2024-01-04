import { z } from "zod"

export const singInSchema = z.object({
	email: z.string().min(1,"O e-mail é obrigatório").email().toLowerCase(),
	password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
})