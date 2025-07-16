from contextlib import asynccontextmanager
from fastapi import FastAPI
from opensearchpy import OpenSearch
from src.opensearch import Opensearch_Client
from src.core.logger import Logger, formatter, logger
from src.core.config import OPENSEARCH_CONFIG


@asynccontextmanager
async def lifespan(app: FastAPI):
    opensearch_handler = None

    try:
        app.state.opensearch_client = Opensearch_Client(
            OpenSearch(hosts=[OPENSEARCH_CONFIG])
        )
        opensearch_handler = Logger(app.state.opensearch_client)
        opensearch_handler.setFormatter(formatter)
        logger.addHandler(opensearch_handler)
        logger.info("OpenSearch client initialized")

        yield

    except Exception as e:
        logger.error(f"Erreur lors de l'initialisation OpenSearch: {e}")
        yield
    finally:
        if opensearch_handler:
            logger.removeHandler(opensearch_handler) 