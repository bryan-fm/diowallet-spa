import { zodResolver } from "@hookform/resolvers/zod";
import { BiArrowBack } from "react-icons/bi"
import { Link, useNavigate, useParams } from "react-router-dom"
import { transactionSchema } from "../schemas/TransactionSchema";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { InputTypeEnum } from "../enums/InputTypeEnum";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import { ButtonTypeEnum } from "../enums/ButtonTypeEnum";
import { createNewTransaction } from "../services/transactions";

export default function NewTransaction() {
    const { type } = useParams()
    const navigation = useNavigate()

    const {register, handleSubmit, formState:{errors}} = useForm({
		resolver: zodResolver(transactionSchema) 
	});

    async function handleFormSubmit(data: any) {
        try {
            const body = {
                ...data,
                type
            }
            await createNewTransaction(body);
            navigation('/');
        } catch(error) {
            console.log(error)
        }
	}

    return (
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 gap-7 relative">
            <header>
            <Link to="/">
                <BiArrowBack className="text-white absolute top-3 left-3 text-2xl"/>
            </Link>
            <h1 className="text-white font-bold text-5xl"> New {type} </h1> 
            </header>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col justify-center gap-4 w-full text-2xl"
            >
                <Input type={InputTypeEnum.NUMBER} placeholder="Value" register={register} name="value"></Input>
                {errors.email && <ErrorMessage text={String(errors?.value?.message)}/>}

                <Input type={InputTypeEnum.TEXT} placeholder="Description" register={register} name="description"></Input>
                {errors.password && <ErrorMessage text={String(errors?.description?.message)}/>}

                <Button type={ButtonTypeEnum.SUBMIT} text="SAVE"></Button>
            </form>
        </div>
    )
}