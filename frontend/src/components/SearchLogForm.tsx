import { useState } from "react";
import type { FormEvent, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import type { Query, LogWithId } from "../types/entity";
import LogLevelRadio from "./LogRadio";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import Textarea from "./TexteArea";


const API_URL = import.meta.env.VITE_API_URL;

function SearchLogForm({ setLogs }: { setLogs: (logs: LogWithId[]) => void }) {
    const [query, setQuery] = useState<Query>({
        level: "",
        message: "",
        service: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!query.message?.trim() && !query.level && !query.service) {
                setLogs([]);
                return;
            }
            const response = await axios.get(`${API_URL}/logs/search`, { params: query });
            if (response.data && Array.isArray(response.data)) {
                setLogs(response.data);
            } else {
                console.error("Réponse invalide:", response.data);
                setLogs([]);
            }
        } catch (error) {
            console.error("Erreur envoi message:", error);
        } finally {
            setIsLoading(false);        
            setQuery({
                level: "",
                message: "",
                service: "",
            });
        }

    };

    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setQuery(prev => ({ ...prev, message: e.target.value }));
    };

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setQuery(prev => ({ ...prev, level: e.target.value }));
    };

    const handleServiceChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setQuery(prev => ({ ...prev, service: e.target.value }));
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
                <h1 className="text-2xl font-bold text-gray-800">Rechercher un log</h1>
                <div className="flex gap-4 items-center">
                    <Input
                        value={query.service}
                        onChange={handleServiceChange}
                        disabled={isLoading}
                    />
                </div>
                <LogLevelRadio
                    value={query.level}
                    onChange={handleRadioChange}
                    name="search-level"
                    disabled={isLoading}
                />
                <Textarea
                    value={query.message}
                    onChange={handleMessageChange}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                />
                <SubmitButton
                    isLoading={isLoading}
                    loadingText="Recherche..."
                    buttonText="Rechercher"
                    icon={<Search size={20} strokeWidth={1.75} />}
                />
            </form>
        </div>
    );
}

export default SearchLogForm;
