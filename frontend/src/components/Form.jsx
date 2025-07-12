import { useEffect, useRef, useState } from "react";
import Cadre from "./Cadre";
import Chat from "./Chat";
import { SendHorizonal } from "lucide-react";


const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8080/ws";

function Form() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const ws = useRef(null);

    useEffect(() => {
        const connectWebSocket = () => {
            console.log("Connexion WebSocket à", WS_URL);
            ws.current = new WebSocket(WS_URL);
            
            ws.current.onopen = () => {
                console.log("WebSocket connecté");
                setIsConnected(true);
            };
            
            ws.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.text) {
                        setMessages(prev => [...prev, { 
                            from: "server", 
                            text: data.text,
                            timestamp: new Date().toISOString()
                        }]);
                    }
                } catch (error) {
                    console.error("Erreur parsing message:", error);
                }
                setIsLoading(false);
            };
            
            ws.current.onerror = (error) => {
                console.error("Erreur WebSocket:", error);
                setIsConnected(false);
                setIsLoading(false);
            };
            
            ws.current.onclose = () => {
                console.log("WebSocket déconnecté");
                setIsConnected(false);
                setIsLoading(false);
            };
        };

        connectWebSocket();

        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                console.log("Fermeture WebSocket...");
                ws.current.close();
            }
            ws.current = null;
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!message.trim()) return;
        if (!isConnected || !ws.current) {
            alert("WebSocket non connecté");
            return;
        }

        setIsLoading(true);
        
        try {
            setMessages(prev => [...prev, { 
                from: "user", 
                text: message,
                timestamp: new Date().toISOString()
            }]);
            
            ws.current.send(JSON.stringify({ text: message }));
            
            setMessage("");
        } catch (error) {
            console.error("Erreur envoi message:", error);
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className={`min-h-0 flex-1 pb-4 flex flex-col ${
            messages.length > 0 ? "justify-end" : "justify-center gap-6 max-w-4xl self-center"
        }`}>
            <Cadre size={"text"} componentChildren={<Chat messages={messages} />}/>
            <div className="m-4 bg-white/70 border-gray-400 rounded-3xl drop-shadow-xl">
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2 p-4 sticky bottom-0 w-full"
                >
                    <input
                        type="text"
                        value={message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Votre message de log..."
                        disabled={!isConnected || isLoading}
                        className="flex-1 px-4 py-2 h-10 focus:outline-none disabled:opacity-50"
                    />
                    
                    <button
                        type="submit"
                        disabled={!isConnected || isLoading || !message.trim()}
                        className="
                            bg-gradient-to-r from-[var(--primary)] to-emerald-400
                            text-white px-4 py-2 rounded-full disabled:opacity-50
                            hover:brightness-110 active:scale-95
                            transition-all duration-200
                            flex items-center justify-center
                        "
                    >
                        <SendHorizonal
                            size={28}
                            strokeWidth={1.75}
                            className="hover:translate-x-1 transition-transform"
                        />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Form;
