class SerializerError(Exception):
    def __init__(self) -> None:
        super().__init__()

class InvalidCredentials(Exception):
    def __init__(self) -> None:
        super().__init__()

class InvalidPassword(Exception):
    def __init__(self, messages: list) -> None:
        super().__init__(messages)

class UserAlreadyExists(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)

class CategoryAlreadyExists(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)

class SubcategoryAlreadyExists(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)

class AccountAlreadyExists(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)

class CreditCardAlreadyExists(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)

class AccountDoesNotExist(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)

class InsufficientFunds(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)