import { InputTypeEnum } from "../enums/InputTypeEnum";

interface ErrorMessageProps {
    text: string,
}

export default function ErrorMessage(props: ErrorMessageProps) {
    const {text} = props;
    
    return (
        <span className="bg-red-100 text-red-800 rounded p-2 text-sm">
            {text}
        </span>
    )
}