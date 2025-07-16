import os
from dotenv import load_dotenv

load_dotenv()

OPENSEARCH_CONFIG = {
    "host": os.getenv("OPENSEARCH_HOST"),
    "port": os.getenv("OPENSEARCH_PORT"),
}

CORS_CONFIG = {
    "allow_origins": [
        "http://localhost:5173",
        "http://frontend:5173",
        "http://127.0.0.1:5173"
    ],
    "allow_credentials": True,
    "allow_methods": ["*"],
    "allow_headers": ["*"],
} 