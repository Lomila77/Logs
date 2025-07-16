import { useState } from "react";
import type { FormEvent, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import { SendHorizonal } from "lucide-react";
import type { Log } from "../types/entity";
import LogLevelRadio from "./LogRadio";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import Textarea from "./TexteArea";
import DateInput from "./Date";

const API_URL = import.meta.env.VITE_API_URL;

function SendLogForm() {
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
            if (response.data) {
                console.log(response.data);
            } else {
                console.error("Réponse invalide:", response.data);
            }
        } catch (error) {
            console.error("Erreur envoi message:", error);
            setIsLoading(false);
        }
        setIsLoading(false);
        setLog({
            timestamp: "",
            level: "",
            message: "",
            service: "",
        });
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
                <h1 className="text-2xl font-bold text-gray-800">Envoyer un log</h1>
                <div className="flex gap-4 items-center">
                    <DateInput
                        value={log.timestamp}
                        onChange={handleDateChange}
                        disabled={isLoading}
                    />
                    <Input
                        value={log.service}
                        onChange={handleServiceChange}
                        disabled={isLoading}
                    />
                </div>
                <LogLevelRadio
                    value={log.level}
                    onChange={handleRadioChange}
                    name="send-level"
                    disabled={isLoading}
                />
                <Textarea
                    value={log.message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                />
                <SubmitButton
                    isLoading={isLoading}
                    disabled={!log.message.trim()}
                    loadingText="Envoi..."
                    buttonText="Envoyer le log"
                    icon={<SendHorizonal size={20} strokeWidth={1.75} />}
                />
            </form>
        </div>
    );
}

export default SendLogForm;
