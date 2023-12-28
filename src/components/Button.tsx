import { ButtonTypeEnum } from "../enums/ButtonTypeEnum";

interface ButtonProps {
    type: ButtonTypeEnum,
    text: string,
}

export default function Button(props: ButtonProps) {
    const {type, text} = props;
    
    return (
        <button
            type={type}
            className="px-4 py-2 rounded w-full font-bold text-white text-2xl
            bg-gradient-to-r from-sky-500 to-indigo-500"
        >
            {text}
        </button>
    )
}