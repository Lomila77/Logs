import logging
from fastapi import APIRouter, Depends
from src.dto import Log, Query
from typing import Optional, Literal

router = APIRouter(prefix="/logs", tags=["logs"])
logger = logging.getLogger("uvicorn")


def get_query(
    level: Optional[Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]] = None,
    message: Optional[str] = None,
    service: Optional[str] = None
):
    level = level.upper() if level else None
    return Query(level=level, message=message, service=service)


@router.post("/")
def create_log(log: Log):
    try:
        from main import app
        return app.state.opensearch_client.save_log(log)
    except Exception as e:
        logger.error(f"Error: {e}")
        return {"error": str(e)}


@router.get("/search")
def search_logs(query: Query = Depends(get_query)):
    try:
        from main import app
        logger.info(f"Recherche de logs avec query: {query}")
        result = app.state.opensearch_client.search_log(query)
        logger.info(f"Résultats trouvés: {len(result) if isinstance(result, list) else 'erreur'}")
        return result
    except Exception as e:
        logger.error(f"Erreur lors de la recherche: {e}")
        return {"error": str(e)} 