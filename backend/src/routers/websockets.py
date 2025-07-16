import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from src.core.logger import logger
from src.core.exceptions import OpenSearchException
from src.dto import LogResponse

router = APIRouter(tags=["websockets"])


@router.websocket("/ws")
async def last_logs(websocket: WebSocket):
    try:
        await websocket.accept()
        while True:
            try:
                logs: list[LogResponse] = websocket.app.state.\
                    opensearch_client.get_last_20_log()
                await websocket.send_json([log.model_dump() for log in logs])
                await asyncio.sleep(3)
            except (Exception, OpenSearchException) as e:
                logger.error(f"Error: {e}")
                await websocket.send_json({"error": str(e)})
                await asyncio.sleep(10)
    except WebSocketDisconnect:
        logger.info("Client disconnected")
