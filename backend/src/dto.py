from pydantic import BaseModel, field_serializer
import datetime
from typing import Literal


class Query(BaseModel):
    level: Literal["", "DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = ""
    message: str = ""
    service: str = ""

    def is_empty(self):
        return self.level == "" and self.message == "" and self.service == ""

    def __str__(self):
        return f"{self.level} - {self.message} - {self.service}"


class Log(BaseModel):
    timestamp: datetime.datetime
    level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
    message: str
    service: str

    @field_serializer("timestamp")
    def serialize_timestamp(self, timestamp: datetime.datetime):
        return timestamp.isoformat()

    def __str__(self):
        return f"{self.timestamp} - {self.service} - {self.level} \
              - {self.message}"


class LogResponse(Log):
    id: str

    def __str__(self):
        return f"{self.id} - {self.timestamp} - {self.service} - {self.level} \
              - {self.message}"
