from core.messages import CoreMessages

class CreditCardMessages(CoreMessages):
    _credit_card_created = 'Credit card created successfully.'
    _credit_card_transaction_created = 'Credit card transaction created successfully.'
    _transfer_created = 'Transfer created successfully.'
    _insufficient_funds = 'Insufficient funds.'

    @property
    def credit_card_created(self):
        return self._credit_card_created
    
    @property
    def credit_card_transaction_created(self):
        return self._credit_card_transaction_created
    
    @property
    def transfer_created(self):
        return self._transfer_created
    
    @property
    def insufficient_funds(self):
        return self._insufficient_funds