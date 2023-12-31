import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import Button from "../components/Button"
import Input from "../components/Input"
import { ButtonTypeEnum } from "../enums/ButtonTypeEnum"
import { InputTypeEnum } from "../enums/InputTypeEnum"
import { BiArrowBack } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorMessage from "../components/ErrorMessage"
import { singUpSchema } from "../schemas/SignUpSchema"
import { signup } from "../services/user"

export default function SignUp() {
	const {register, handleSubmit, formState:{errors}} = useForm({
		resolver: zodResolver(singUpSchema) 
	});

    const navigate = useNavigate();

    async function handleFormSubmit(data: any) {
        try {
            await signup(data);
            navigate('/signin');
        } catch(error) {
            console.log(error.message)
        }
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