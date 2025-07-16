from fastapi import APIRouter, Depends, Request
from src.dto import Log, Query
from typing import Literal
from src.core.logger import logger

router = APIRouter(prefix="/logs", tags=["logs"])


@router.post("/")
def create_log(log: Log, request: Request):
    try:
        return request.app.state.opensearch_client.save_log(log)
    except Exception as e:
        logger.error(f"Error: {e}")
        return {"error": str(e)}


def get_query(
    level: Literal["", "DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = "",
    message: str = "",
    service: str = ""
):
    level = level.upper()
    return Query(level=level, message=message, service=service)


@router.get("/search")
def search_logs(query: Query = Depends(get_query), request: Request = Request):
    try:
        result = request.app.state.opensearch_client.search_log(query)
        return result
    except Exception as e:
        logger.error(f"Erreur lors de la recherche: {e}")
        return {"error": str(e)}
