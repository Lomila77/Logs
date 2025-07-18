import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.lifespan import lifespan
from src.core.config import CORS_CONFIG
from src.routers import websockets, service
from src.core.error_handlers import register_error_handlers

app = FastAPI(lifespan=lifespan)

register_error_handlers(app)

app.add_middleware(CORSMiddleware, **CORS_CONFIG)

app.include_router(service.router)
app.include_router(websockets.router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
