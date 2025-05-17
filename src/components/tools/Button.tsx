import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    color?: string;
    label?: string;
    type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({ onClick, label, color, type = "button" }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${color} w-full py-2 rounded-md`}
        >
            {label}
        </button>
    );
};

