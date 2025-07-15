import { useEffect, useRef, useState } from "react";
import type { FormEvent, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import { SendHorizonal } from "lucide-react";

interface Log {
    timestamp: string;
    level: string;
    message: string;
    service: string;
}


const API_URL = import.meta.env.VITE_API_URL;

function Form() {
    const [log, setLog] = useState<Log>({
        timestamp: "",
        level: "",
        message: "",
        service: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        
        if (!log.message.trim()) return;
        setIsLoading(true);
        
        try {
            const userLog: Log = {
                timestamp: new Date().toISOString(),
                level: log.level,
                message: log.message,
                service: log.service,
            }
            setLog(userLog);

            const response = await axios.post(`${API_URL}/logs`, userLog);
            console.log(response.data);
        } catch (error) {
            console.error("Erreur envoi message:", error);
            setIsLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setLog(prev => ({ ...prev, message: e.target.value }));
    };

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLog(prev => ({ ...prev, level: e.target.value }));
    };

    const handleServiceChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLog(prev => ({ ...prev, service: e.target.value }));
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLog(prev => ({ ...prev, timestamp: e.target.value }));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    return (
        <div className="m-4 bg-white/70 border-gray-400 rounded-3xl drop-shadow-xl">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-6"
            >
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            value={log.timestamp}
                            onChange={handleDateChange}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-medium text-gray-700">Service</label>
                        <input
                            type="text"
                            value={log.service}
                            onChange={handleServiceChange}
                            placeholder="Nom du service"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Niveau de log</label>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="info"
                                name="level"
                                value="INFO"
                                onChange={handleRadioChange}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="info" className="text-sm font-medium text-gray-700">INFO</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="error"
                                name="level"
                                value="ERROR"
                                onChange={handleRadioChange}
                                className="w-4 h-4 text-red-600 focus:ring-red-500"
                            />
                            <label htmlFor="error" className="text-sm font-medium text-gray-700">ERROR</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="warn"
                                name="level"
                                value="WARN"
                                onChange={handleRadioChange}
                                className="w-4 h-4 text-yellow-600 focus:ring-yellow-500"
                            />
                            <label htmlFor="warn" className="text-sm font-medium text-gray-700">WARN</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="debug"
                                name="level"
                                value="DEBUG"
                                onChange={handleRadioChange}
                                className="w-4 h-4 text-gray-600 focus:ring-gray-500"
                            />
                            <label htmlFor="debug" className="text-sm font-medium text-gray-700">DEBUG</label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        value={log.message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Votre message de log..."
                        disabled={isLoading}
                        rows={3}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
                    />
                </div>

                {/* Ligne 4: Bouton d'envoi */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading || !log.message.trim()}
                        className="
                            bg-gradient-to-r from-[var(--primary)] to-emerald-400
                            text-white px-6 py-3 rounded-lg disabled:opacity-50
                            hover:brightness-110 active:scale-95
                            transition-all duration-200
                            flex items-center gap-2
                            font-medium
                        "
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                Envoi...
                            </>
                        ) : (
                            <>
                                <SendHorizonal size={20} strokeWidth={1.75} />
                                Envoyer le log
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
