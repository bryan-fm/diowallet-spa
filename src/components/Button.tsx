import { ReactNode } from "react";
import { ButtonTypeEnum } from "../enums/ButtonTypeEnum";
import { TransactionEnum } from "../enums/TransactionEnum";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
    type: ButtonTypeEnum,
    text: string,
    icon?: ReactNode
    transaction?: TransactionEnum;
}

export default function Button(props: ButtonProps) {
    let {type, text, icon, transaction} = props;
    const navigate = useNavigate();

    if(!icon) {
        icon = <></>
    }
    
    return (
        <button
            type={type}
            className="px-4 py-2 rounded w-full font-bold text-white text-2xl
            bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center gap-2"
            onClick={() => {transaction && navigate(`/transaction/${transaction}`)}}
        >
          {icon}  {text}
        </button>
    )
}