from pydantic import BaseModel, field_serializer, field_validator
import datetime


class Query(BaseModel):
    level: str
    message: str
    service: str

    @field_validator("level")
    def validate_level(cls, level: str):
        if level not in ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]:
            raise ValueError("Invalid level")
        return level


class Log(BaseModel):
    timestamp: datetime.datetime
    level: str
    message: str
    service: str

    @field_serializer("timestamp")
    def serialize_timestamp(self, timestamp: datetime.datetime):
        return timestamp.isoformat()

    @field_validator("level")
    def validate_level(cls, level: str):
        if level not in ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]:
            raise ValueError("Invalid level")
        return level


class LogResponse(Log):
    id: str
