import { ReactNode } from "react";
import { ButtonTypeEnum } from "../enums/ButtonTypeEnum";

interface ButtonProps {
    type: ButtonTypeEnum,
    text: string,
    icon?: ReactNode
}

export default function Button(props: ButtonProps) {
    let {type, text, icon} = props;

    if(!icon) {
        icon = <></>
    }
    
    return (
        <button
            type={type}
            className="px-4 py-2 rounded w-full font-bold text-white text-2xl
            bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center gap-2"
        >
          {icon}  {text}
        </button>
    )
}