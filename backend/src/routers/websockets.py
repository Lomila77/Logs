import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from src.core.logger import logger

router = APIRouter(tags=["websockets"])


@router.websocket("/ws")
async def last_logs(websocket: WebSocket):
    try:
        await websocket.accept()
        while True:
            logs = websocket.app.state.opensearch_client.get_last_20_log()
            await websocket.send_json([log.model_dump() for log in logs])
            await asyncio.sleep(3)
    except WebSocketDisconnect:
        logger.info("Client disconnected")
    except Exception as e:
        logger.error(f"Error: {e}")
