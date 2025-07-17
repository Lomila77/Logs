from opensearchpy import OpenSearch
from src.dto import Log, LogResponse, Query
from src.core.exceptions import OpenSearchException


class Opensearch_Client:
    def __init__(self, client: OpenSearch):
        self.client = client

    def get_last_20_log(self):
        try:
            response: dict = self.client.search(
                index="logs-*",
                body={
                    "query": {"match_all": {}},
                    "sort": [{"timestamp": {"order": "desc"}}],
                    "size": 20
                }
            )
            if not response or not response["hits"]["hits"]:
                return []
            return [
                LogResponse(**log["_source"], id=log["_id"])
                for log in response["hits"]["hits"]
            ]
        except Exception as e:
            raise OpenSearchException("get_last_20_log", e)

    def search_log(self, search: Query) -> list[LogResponse]:
        try:
            def build_query(search: Query) -> dict:
                if search.is_empty():
                    return {}
                query: dict = {
                    "query": {
                        "bool": {
                            "must": []
                        }
                    },
                    "sort": [{"timestamp": {"order": "desc"}}]
                }
                if search.level != "":
                    query["query"]["bool"]["must"].append(
                        {"term": {"level": search.level}})
                if search.service != "":
                    query["query"]["bool"]["must"].append(
                        {"term": {"service": search.service}})
                if search.message != "":
                    query["query"]["bool"]["must"].append(
                        {"wildcard": {"message": f"*{search.message}*"}}
                    )
                return query
            query: dict = build_query(search)
            if query == {}:
                return []
            response: dict = self.client.search(body=query, index="logs-*")
            return [
                LogResponse(**log["_source"], id=log["_id"])
                for log in response["hits"]["hits"]
            ]
        except Exception as e:
            raise OpenSearchException("search_log", e)

    def save_log(self, log: Log) -> LogResponse:
        try:
            index: str = "logs-" + log.timestamp.strftime("%Y-%m-%d")
            if not self.client.indices.exists(index=index):
                self.client.indices.create(
                    index=index,
                    body={
                        "mappings": {
                            "properties": {
                                "level": {"type": "keyword"},
                                "service": {"type": "keyword"},
                                "message": {"type": "text"},
                                "timestamp": {"type": "date"}
                            }
                        }
                    }
                )
            response: dict = self.client.index(
                index=index, body=log.model_dump(), refresh=True)
            return LogResponse(id=response["_id"], **log.model_dump())
        except Exception as e:
            raise OpenSearchException("save_log", e)
