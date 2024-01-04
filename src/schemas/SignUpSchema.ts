import { z } from "zod"

export const singUpSchema = z.object({
    name: z.string()
        .min(6,"O nome precisa de no mínimo 6 caracteres")
        .transform((name: string) => {
            return name.trim().split(" ").map((word: string) => {
                return word[0].toLocaleUpperCase().concat(word.substring(1));
            }).join(" ")
        }),
	email: z.string().min(1,"O e-mail é obrigatório").email().toLowerCase(),
	password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "A senha precisa de no mínimo 6 caracteres")
}).refine((data) => data.password === data.confirmPassword, {
    message:"As senhas não correspondem",
    path:["confirmPassword"],
})