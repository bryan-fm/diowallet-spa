import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import Button from "../components/Button"
import Input from "../components/Input"
import { ButtonTypeEnum } from "../enums/ButtonTypeEnum"
import { InputTypeEnum } from "../enums/InputTypeEnum"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorMessage from "../components/ErrorMessage"
import { singInSchema } from "../schemas/SignInSchema"
import { signIn } from "../services/user"
import Cookies from "js-cookie"

export default function SignIn() {
	const navigate = useNavigate();
	const {register, handleSubmit, formState:{errors}} = useForm({
		resolver: zodResolver(singInSchema) 
	});

    async function handleFormSubmit(data: any) {
        try {
           const token = await signIn(data);
		   Cookies.set("token", token.data, {expires: 1});
		   navigate("/");
        } catch(error) {
            console.log(error.message)
        }
	}

    return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem]">
		<img src={logo} alt="" className="w-44"></img>
	    <form className="flex flex-col justify-center gap-4 w-full text-2xl" onSubmit={handleSubmit(handleFormSubmit)}>
			<Input type={InputTypeEnum.EMAIL} placeholder="Email" register={register} name="email"></Input>
			{errors.email && <ErrorMessage text={String(errors?.email?.message)}/>}
			<Input type={InputTypeEnum.PASSWORD} placeholder="Password" register={register} name="password"></Input>
			{errors.password && <ErrorMessage text={String(errors?.password?.message)}/>}
			<Button type={ButtonTypeEnum.SUBMIT} text="SIGNIN"></Button>
		</form>
		<p className="text-white text-2xl">
			Don't have an account?
			<Link to="/signup" className="text-sky-400 hover:text-sky-600"> SignUp </Link>
		</p>
    </div>
    )
}