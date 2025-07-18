import type { LogWithId } from '../types/entity';


function SearchResultLog({ logs }: { logs: LogWithId[] }) {

    return (
        <div className="m-4 bg-white/70 border-gray-400 rounded-3xl drop-shadow-xl">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Résultat de la recherche</h2>
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
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-500">
                                        {new Date(log.timestamp).toLocaleString('fr-FR')}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        ID: {log.id}
                                    </span>
                                </div>
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

export default SearchResultLog;
