import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from starlette.websockets import WebSocketState
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
                if websocket.client_state == WebSocketState.CONNECTED:
                    await websocket.send_json([log.model_dump() for log in logs])
                    await asyncio.sleep(3)
                else:
                    logger.warning("Client websocket disconnected")
                    await asyncio.sleep(10)
            except (OpenSearchException) as e:
                logger.error(f"Error: {e}")
    except WebSocketDisconnect as e:
        logger.info(f"Websocket disconnected: {e}")
    except Exception as e:
        logger.error(f"Error: {e}")
