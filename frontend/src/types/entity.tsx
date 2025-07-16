export interface Query {
    level: string;
    message: string;
    service: string;
}

export interface Log extends Query {
    timestamp: string;
}

export interface LogWithId extends Log {
    id: string;
}
