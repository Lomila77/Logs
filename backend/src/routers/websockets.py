import logging
import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter(tags=["websockets"])
logger = logging.getLogger("uvicorn")


@router.websocket("/ws")
async def last_logs(websocket: WebSocket):
    try:
        await websocket.accept()
        while True:
            from main import app
            logs = app.state.opensearch_client.get_last_20_log()
            await websocket.send_json([log.model_dump() for log in logs])
            await asyncio.sleep(3)
    except WebSocketDisconnect:
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Error: {e}")
