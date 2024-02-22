class UserAlreadyExists(Exception):
    def __init__(self) -> None:
        super().__init__()

class InvalidPassword(Exception):
    def __init__(self, errors: list) -> None:
        self.errors = errors
        message = ";".join(errors)
        super().__init__(message)