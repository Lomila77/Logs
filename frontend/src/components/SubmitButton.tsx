import { ReactNode } from "react";

interface SubmitButtonProps {
    isLoading: boolean;
    disabled?: boolean;
    loadingText: string;
    buttonText: string;
    icon: ReactNode;
    className?: string;
}

function SubmitButton({ 
    isLoading, 
    disabled = false, 
    loadingText, 
    buttonText, 
    icon,
    className = ""
}: SubmitButtonProps) {
    return (
        <div className="flex justify-end">
            <button
                type="submit"
                disabled={isLoading || disabled}
                className={`
                    bg-gradient-to-r from-[var(--primary)] to-emerald-400
                    text-white px-6 py-3 rounded-lg disabled:opacity-50
                    hover:brightness-110 active:scale-95
                    transition-all duration-200
                    flex items-center gap-2
                    font-medium
                    ${className}
                `}
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        {loadingText}
                    </>
                ) : (
                    <>
                        {icon}
                        {buttonText}
                    </>
                )}
            </button>
        </div>
    );
}

export default SubmitButton;
