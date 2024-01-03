import { InputTypeEnum } from "../enums/InputTypeEnum";

interface InputProps {
    type: InputTypeEnum,
    placeholder: string,
    register: Function,
    name: string,
}

export default function Input(props: InputProps) {
    const {type, placeholder, register, name} = props;
    
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="rounded p-2 w-full"
            {...register(name)}
        />
    )
}