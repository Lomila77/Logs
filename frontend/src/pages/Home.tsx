import { useState } from "react";
import type { LogWithId } from "../types/entity";
import HistoryLogs from "../components/HistoryLogs";
import SendLogForm from "../components/SendLogForm";
import SearchLogForm from "../components/SearchLogForm";
import SearchResultLog from "../components/SearchResultLog";

function Home() {
    const [searchResults, setSearchResults] = useState<LogWithId[]>([]);

    return (
        <div className='min-h-screen flex w-full flex-col'>
            <h1 className='text-xl text-left p-2 text-[var(--primary)] font-bold drop-shadow-lg'>Logs</h1>
            
            <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-auto">
                <div className="flex-1 flex flex-col gap-4">
                    <HistoryLogs />
                    <SendLogForm />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <SearchResultLog logs={searchResults} />
                    <SearchLogForm setLogs={setSearchResults} />
                </div>
            </div>
        </div>
    );
}

export default Home;
