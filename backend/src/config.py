import logging
import os
from dotenv import load_dotenv

load_dotenv()

LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
DATE_FORMAT = '%Y-%m-%d %H:%M:%S'


def setup_logging():
    formatter = logging.Formatter(fmt=LOG_FORMAT, datefmt=DATE_FORMAT)

    logging.basicConfig(
        level=logging.INFO,
        format=LOG_FORMAT,
        datefmt=DATE_FORMAT,
        handlers=[
            logging.StreamHandler(),
        ]
    )

    return formatter, logging.getLogger("uvicorn")


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