from core.messages import CoreMessages

class TransactionMessages(CoreMessages):
    _description_length_invalid = 'The description must have a maximum of 100 characters.'
    _value_invalid = 'The value must be greater than 0.'
    _created = 'Transaction created successfully.'

    @property
    def description_length_invalid(self):
        return self._description_length_invalid
    
    @property
    def value_invalid(self):
        return self._value_invalid
    
    @property
    def created(self):
        return self._created