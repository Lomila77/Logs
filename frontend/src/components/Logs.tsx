import { useEffect, useRef, useState } from "react";

interface Log {
    timestamp: string;
    level: string;
    message: string;
    service: string;
    id: string;
}

const WS_URL = import.meta.env.VITE_WS_URL;

function Logs() {
    const [logs, setLogs] = useState<Log[]>([]);
    
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const connectWebSocket = (): void => {
            console.log("Connexion WebSocket à", WS_URL);
            ws.current = new WebSocket(WS_URL);
            
            ws.current.onopen = () => {
                console.log("WebSocket connecté");
            };
            
            ws.current.onmessage = (event: MessageEvent) => {
                try {
                    const data = JSON.parse(event.data);
                    if (Array.isArray(data)) {
                        setLogs(data);
                    }
                } catch (error) {
                    console.error("Erreur parsing message:", error);
                }
            };
            
            ws.current.onerror = (error: Event) => {
                console.error("Erreur WebSocket:", error);
            };
            
            ws.current.onclose = () => {
                console.log("WebSocket déconnecté");
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


    return (
        <div className="m-4 bg-white/70 border-gray-400 rounded-3xl drop-shadow-xl">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Historique des logs</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {logs.map((log, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                                        log.level === 'WARN' ? 'bg-yellow-100 text-yellow-800' :
                                        log.level === 'INFO' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {log.level}
                                    </span>
                                    {log.service && (
                                        <span className="text-sm text-gray-600 font-medium">
                                            {log.service}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-gray-500">
                                    {new Date(log.timestamp).toLocaleString('fr-FR')}
                                </span>
                            </div>
                            <p className="text-gray-800 text-sm leading-relaxed">
                                {log.message}
                            </p>
                        </div>
                    ))}
                    {logs.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Aucun log disponible
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Logs;
