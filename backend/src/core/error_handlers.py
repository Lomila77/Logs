from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from src.core.exceptions import OpenSearchException, LogException


def register_error_handlers(app: FastAPI):
    @app.exception_handler(OpenSearchException)
    async def open_search_exception_handler(
        request: Request, exc: OpenSearchException
    ):
        return JSONResponse(status_code=500, content={"message": str(exc)})

    @app.exception_handler(LogException)
    async def log_exception_handler(
        request: Request, exc: LogException
    ):
        return JSONResponse(status_code=500, content={"message": str(exc)})

    @app.exception_handler(Exception)
    async def exception_handler(
        request: Request, exc: Exception
    ):
        return JSONResponse(status_code=500, content={"message": str(exc)})
