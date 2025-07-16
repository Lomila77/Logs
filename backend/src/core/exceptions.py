class OpenSearchException(Exception):
    def __init__(self, operation: str, error: Exception):
        self.message = f"OpenSearch {operation} error: {error}"
        super().__init__(self.message)
        try:
            from src.core.logger import logger
            logger.error(self.message)
        except Exception as e:
            print(f"Error: {e}")


class LogException(Exception):
    def __init__(self, operation: str, error: Exception):
        self.message = f"Log {operation} error: {error}"
        super().__init__(self.message)
        try:
            from src.core.logger import logger
            logger.error(self.message)
        except Exception as e:
            print(f"Error: {e}")
