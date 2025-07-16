import type { ChangeEvent } from "react";

interface LogLevelRadioProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    disabled?: boolean;
}

const LOG_LEVELS = [
    { value: "INFO", label: "INFO", color: "blue" },
    { value: "ERROR", label: "ERROR", color: "red" },
    { value: "WARNING", label: "WARNING", color: "yellow" },
    { value: "DEBUG", label: "DEBUG", color: "gray" },
] as const;

function LogLevelRadio({ value, onChange, name = "level", disabled = false }: LogLevelRadioProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Niveau de log</label>
            <div className="flex gap-6">
                {LOG_LEVELS.map((level) => (
                    <div key={level.value} className="flex items-center gap-2">
                        <input
                            type="radio"
                            id={`${level.value.toLowerCase()}-${name}`}
                            name={name}
                            value={level.value}
                            checked={value === level.value}
                            onChange={onChange}
                            disabled={disabled}
                            className={`w-4 h-4 text-${level.color}-600 focus:ring-${level.color}-500 disabled:opacity-50`}
                        />
                        <label 
                            htmlFor={`${level.value.toLowerCase()}-${name}`} 
                            className="text-sm font-medium text-gray-700"
                        >
                            {level.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LogLevelRadio;
