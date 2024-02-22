class InvalidCredentials(Exception):
    def __init__(self) -> None:
        super().__init__()