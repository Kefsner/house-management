from core.messages import CoreMessages

class FinancesMessages(CoreMessages):
    _description_length_invalid = 'The description must have a maximum of 100 characters.'
    _value_invalid = 'The value must be greater than 0.'
    _created = 'Transaction created successfully.'
    _category_created = 'Category created successfully.'
    _category_already_exists = 'Category already exists.'

    @property
    def description_length_invalid(self):
        return self._description_length_invalid
    
    @property
    def value_invalid(self):
        return self._value_invalid
    
    @property
    def created(self):
        return self._created
    
    @property
    def category_created(self):
        return self._category_created
    
    @property
    def category_already_exists(self):
        return self._category_already_exists