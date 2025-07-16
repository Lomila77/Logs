from pydantic import BaseModel, field_serializer
import datetime
from typing import Literal


class Query(BaseModel):
    level: Literal["", "DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = ""
    message: str = ""
    service: str = ""

    def is_empty(self):
        return self.level == "" and self.message == "" and self.service == ""


class Log(BaseModel):
    timestamp: datetime.datetime
    level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
    message: str
    service: str

    @field_serializer("timestamp")
    def serialize_timestamp(self, timestamp: datetime.datetime):
        return timestamp.isoformat()


class LogResponse(Log):
    id: str
