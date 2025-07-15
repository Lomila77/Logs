from logging import Handler, LogRecord, Formatter
from src.opensearch import Opensearch_Client
from src.dto import Log
import datetime


class Logger(Handler):
    def __init__(self, client: Opensearch_Client):
        super().__init__()
        self.client = client
        self.formatter = Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    def emit(self, record: LogRecord):
        log = Log(
            timestamp=datetime.datetime.fromtimestamp(record.created),
            level=record.levelname,
            message=record.getMessage(),
            service=record.name
        )
        self.client.save_log(log)
        print(log)
