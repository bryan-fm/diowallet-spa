import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import Button from "../components/Button"
import Input from "../components/Input"
import { ButtonTypeEnum } from "../enums/ButtonTypeEnum"
import { InputTypeEnum } from "../enums/InputTypeEnum"
import { BiArrowBack } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorMessage from "../components/ErrorMessage"

const singUpSchema = z.object({
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

export default function SignUp() {
	const {register, handleSubmit, formState:{errors}} = useForm({
		resolver: zodResolver(singUpSchema) 
	});

    const handleFormSubmit = (data: any) => {
		console.log(data);
	}

    return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] flex-h relative">
        <Link to="/signin">
            <BiArrowBack className="text-white absolute top-3 left-3 text-2xl hover:text-sky-600" />
        </Link> 
		<img src={logo} alt="" className="w-44 mb-20 mt-10"></img>
        <form className="flex flex-col items-center justify-center gap-4 w-full text-2xl" onSubmit={handleSubmit(handleFormSubmit)}>
            <Input type={InputTypeEnum.TEXT} placeholder="Full Name" register={register} name="name"></Input>
            {errors.name && <ErrorMessage text={String(errors?.name?.message)}/>}
            <Input type={InputTypeEnum.EMAIL} placeholder="Email" register={register} name="email"></Input>
            {errors.email && <ErrorMessage text={String(errors?.email?.message)}/>}
            <Input type={InputTypeEnum.PASSWORD} placeholder="Password" register={register} name="password"></Input>
            {errors.password && <ErrorMessage text={String(errors?.password?.message)}/>}
            <Input type={InputTypeEnum.PASSWORD} placeholder="Confirm Password" register={register} name="confirmPassword"></Input>
            {errors.confirmPassword && <ErrorMessage text={String(errors?.confirmPassword?.message)}/>}

            <Button type={ButtonTypeEnum.SUBMIT} text="SIGNUP" />
        </form>
    </div>
    )
}