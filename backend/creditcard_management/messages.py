from core.messages import CoreMessages

class CreditCardMessages(CoreMessages):
    _credit_card_created = 'Credit card created successfully.'

    @property
    def credit_card_created(self):
        return self._credit_card_created