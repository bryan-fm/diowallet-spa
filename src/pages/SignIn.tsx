import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import Button from "../components/Button"
import Input from "../components/Input"
import { ButtonTypeEnum } from "../enums/ButtonTypeEnum"
import { InputTypeEnum } from "../enums/InputTypeEnum"

export default function SignIn() {
    return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem]">
		<img src={logo} alt="" className="w-44"></img>
	    <form className="flex flex-col justify-center gap-4 w-full text-2xl">
			<Input type={InputTypeEnum.EMAIL} placeholder="Email"></Input>
			<Input type={InputTypeEnum.PASSWORD} placeholder="Password"></Input>
			<Button type={ButtonTypeEnum.SUBMIT} text="SIGNIN"></Button>
		</form>
		<p className="text-white text-2xl">
			Don't have an account?
			<Link to="/signup" className="text-sky-400 hover:text-sky-600"> SignUp </Link>
		</p>
    </div>
    )
}