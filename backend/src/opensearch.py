
from opensearchpy import OpenSearch
from src.dto import Log, LogResponse, Query


class Opensearch_Client:
    def __init__(self, client: OpenSearch):
        self.client = client

    def get_last_20_log(self):
        response = self.client.search(
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

    def get_logs(self) -> list[LogResponse]:
        response = self.client.search(
            body={
                "query": {"match_all": {}},
                "sort": [{"timestamp": {"order": "desc"}}],
                "size": 20
            }
        )
        return [
            LogResponse(**log["_source"])
            for log in response["hits"]["hits"]
        ]

    def search_log(self, search: Query) -> list[LogResponse]:
        def build_query(search: Query) -> dict:
            query = {
                "query": {
                    "bool": {
                        "must": []
                    }
                },
                "sort": [{"timestamp": {"order": "desc"}}]
            }
            if search.level is not None:
                query["query"]["bool"]["must"].append(
                    {"term": {"level.keyword": search.level}})
            if search.service is not None:
                query["query"]["bool"]["must"].append(
                    {"term": {"service.keyword": search.service}})
            if search.message is not None:
                query["query"]["bool"]["must"].append(
                    {"wildcard": {"message": f"*{search.message}*"}}
                )
            return query
        query = build_query(search)
        response = self.client.search(body=query, index="logs-*")
        return [
            LogResponse(**log["_source"], id=log["_id"])
            for log in response["hits"]["hits"]
        ]

    def search_logs(self) -> list[LogResponse]:
        response = self.client.search(
            index="logs",
            body={
                "query": {"match_all": {}},
                "sort": [{"timestamp": {"order": "desc"}}]
            }
        )
        return [
            LogResponse(**log["_source"])
            for log in response["hits"]["hits"]
        ]

    def save_log(self, log: Log) -> LogResponse:
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
        response = self.client.index(
            index=index, body=log.model_dump(), refresh=True)
        return LogResponse(id=response["_id"], **log.model_dump())

    def get_log_by_id(self, id: str) -> LogResponse:
        response = self.client.get(index="logs", id=id)
        return LogResponse(**response["_source"])

    def delete_log(self, id: str) -> None:
        self.client.delete(index="logs", id=id)

# Chercher si l'index existe