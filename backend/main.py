import logging
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from src.dto import Log, LogResponse, Query
import uvicorn
from contextlib import asynccontextmanager
from opensearchpy import OpenSearch
from src.opensearch import Opensearch_Client
import os
from dotenv import load_dotenv
from src.logger import Logger

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn")


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.opensearch_client = Opensearch_Client(
        OpenSearch(
            hosts=[
                {
                    "host": os.getenv("OPENSEARCH_HOST"),
                    "port": os.getenv("OPENSEARCH_PORT"),
                }
            ],
        )
    )
    opensearch_handler = Logger(app.state.opensearch_client)
    logger.addHandler(opensearch_handler)
    logger.info("OpenSearch client initialized")
    yield
    logger.removeHandler(opensearch_handler)


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://frontend:5173",  # Nom du conteneur
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.websocket("/ws")
async def last_logs(websocket: WebSocket):
    try:
        await websocket.accept()
        while True:
            logs = app.state.opensearch_client.get_last_20_log()
            await websocket.send_json([log.model_dump() for log in logs])
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Error: {e}")


@app.post("/logs")
def create_log(log: Log):
    try:
        return app.state.opensearch_client.save_log(log)
    except Exception as e:
        logger.error(f"Error: {e}")
        return {"error": str(e)}


@app.get("/logs/search")
def search_logs(query: Query):
    try:
        logs = app.state.opensearch_client.search_log(query)
        return [LogResponse(**log.model_dump()) for log in logs]
    except Exception as e:
        logger.error(f"Error: {e}")
        return {"error": str(e)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
