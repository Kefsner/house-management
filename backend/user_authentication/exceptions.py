class InvalidCredentials(Exception):
    def __init__(self) -> None:
        super().__init__()

class NoRefreshToken(Exception):
    def __init__(self) -> None:
        super().__init__()