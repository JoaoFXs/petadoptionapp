import React  from "react";

interface InputTextProps {
    style?: string;
    onChange?: (evet: React.ChangeEvent<HTMLInputElement>) => void;
    placeHolder?: string;
    id?: string;
    value?: string;
    type?: string;
}

export const InputText: React.FC<InputTextProps> = ({style, type = "text", ...rest}: InputTextProps) => {
    return (
        <input
            type={type} 
            {...rest}
            className={`${style} px-4 py-2 border rounded-md`}
        />
    )
}