from pydantic import BaseModel, field_serializer
import datetime
from typing import Optional, Literal


class Query(BaseModel):
    level: Optional[Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]] = None
    message: Optional[str] = None
    service: Optional[str] = None


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
