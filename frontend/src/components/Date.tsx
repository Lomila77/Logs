import type { ChangeEvent } from "react";

interface DateInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    label?: string;
}

function DateInput({ 
    value, 
    onChange, 
    disabled = false, 
    label = "Date"
}: DateInputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                type="date"
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
        </div>
    );
}

export default DateInput;
