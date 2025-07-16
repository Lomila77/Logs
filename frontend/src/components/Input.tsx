import type { ChangeEvent } from "react";

interface InputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
}

function Input({ 
    value, 
    onChange, 
    disabled = false, 
    placeholder = "Nom du service",
    label = "Service"
}: InputProps) {
    return (
        <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
        </div>
    );
}

export default Input;
