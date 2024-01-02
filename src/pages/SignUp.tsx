import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import Button from "../components/Button"
import Input from "../components/Input"
import { ButtonTypeEnum } from "../enums/ButtonTypeEnum"
import { InputTypeEnum } from "../enums/InputTypeEnum"
import { BiArrowBack } from "react-icons/bi"

export default function SignUp() {
    return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem] relative">
        <Link to="/signin">
            <BiArrowBack className="text-white absolute top-3 left-3 text-2xl hover:text-sky-600" />
        </Link> 
		<img src={logo} alt="" className="w-44"></img>
        <form className="flex flex-col items-center justify-center gap-4 w-full text-2xl">
            <Input type={InputTypeEnum.TEXT} placeholder="Full Name"></Input>
            <Input type={InputTypeEnum.EMAIL} placeholder="Email"></Input>
            <Input type={InputTypeEnum.PASSWORD} placeholder="Password"></Input>
            <Input type={InputTypeEnum.PASSWORD} placeholder="Confirm Password"></Input>

            <Button type={ButtonTypeEnum.SUBMIT} text="SIGNUP" />
        </form>
    </div>
    )
}