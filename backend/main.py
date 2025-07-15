import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.lifespan import lifespan
from src.config import CORS_CONFIG
from src.routers import logs, websockets

app = FastAPI(lifespan=lifespan)


app.add_middleware(CORSMiddleware, **CORS_CONFIG)

app.include_router(logs.router)
app.include_router(websockets.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
