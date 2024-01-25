class SerializerError(Exception):
    def __init__(self) -> None:
        super().__init__('Invalid serializer data')