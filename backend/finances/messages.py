from core.messages import CoreMessages

class FinancesMessages(CoreMessages):
    _description_length_invalid = 'The description must have a maximum of 100 characters.'
    _value_invalid = 'The value must be greater than 0.'
    _transaction_created = 'Transaction created successfully.'
    _category_created = 'Category created successfully.'
    _category_already_exists = 'Category already exists.'
    _subcategory_created = 'Subcategory created successfully.'
    _subcategory_already_exists = 'Subcategory already exists.'
    _account_created = 'Account created successfully.'
    _account_already_exists = 'Account already exists.'
    _credit_card_created = 'Credit card created successfully.'
    _credit_card_transaction_created = 'Credit card transaction created successfully.'
    _credit_card_installment_paid = 'Credit card installment paid successfully.'

    @property
    def description_length_invalid(self):
        return self._description_length_invalid
    
    @property
    def value_invalid(self):
        return self._value_invalid
    
    @property
    def transaction_created(self):
        return self._transaction_created
    
    @property
    def category_created(self):
        return self._category_created
    
    @property
    def category_already_exists(self):
        return self._category_already_exists
    
    @property
    def subcategory_created(self):
        return self._subcategory_created
    
    @property
    def subcategory_already_exists(self):
        return self._subcategory_already_exists
    
    @property
    def account_created(self):
        return self._account_created
    
    @property
    def account_already_exists(self):
        return self._account_already_exists
    
    @property
    def credit_card_created(self):
        return self._credit_card_created
    
    @property
    def credit_card_transaction_created(self):
        return self._credit_card_transaction_created
    
    @property
    def credit_card_installment_paid(self):
        return self._credit_card_installment_paid