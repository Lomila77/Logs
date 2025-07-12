import logging
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello World"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    try:
        await websocket.accept()
        while True:
            data = await websocket.receive_text()
            logger.info(f"Log received: {data}")
            #await websocket.send_json({"text": "Log received"})
    except WebSocketDisconnect:
        logger.info("Client disconnected")
    except Exception as e:
        print(f"Error: {e}")