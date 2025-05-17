import React  from "react";
import { EyeButton } from "./EyeButton";
import { useState } from "react";
interface InputTextProps {
    style?: string;
    onChange?: (evet: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
    value?: string;
    type?: string;
    children?: React.ReactNode;
    onlyPassword?: boolean;
}

export const InputText: React.FC<InputTextProps> = ({ style, type = "text", children, onlyPassword,...rest }) => {

   const [isVisible, setIsVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col">
      <div className="relative">
        <input
          type={isPassword && !isVisible? "password" : "text"}
          {...rest}
          className={`${style} px-4 py-2 pr-10 border rounded-md text-gray-900 w-full`}
        />
       {isPassword && onlyPassword && (
        <div className="absolute inset-y-0 right-3 flex items-center">
            <EyeButton onClick={() => setIsVisible(!isVisible)} isVisible={isVisible} />
        </div>
        )}
      </div>
    </div>
  );
};