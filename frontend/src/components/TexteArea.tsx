import type { ChangeEvent, KeyboardEvent } from "react";

interface MessageTextareaProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    rows?: number;
}

function MessageTextarea({ 
    value, 
    onChange, 
    onKeyDown,
    disabled = false, 
    placeholder = "Votre message de log...",
    label = "Message",
    rows = 3
}: MessageTextareaProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
            />
        </div>
    );
}

export default MessageTextarea;
