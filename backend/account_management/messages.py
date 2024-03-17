from core.messages import CoreMessages

class AccountMessages(CoreMessages):
    _account_created = 'Account created successfully.'
    _transaction_created = 'Transaction created successfully.'
    _transfer_created = 'Transfer created successfully.'

    @property
    def account_created(self):
        return self._account_created
    
    @property
    def transaction_created(self):
        return self._transaction_created
    
    @property
    def transfer_created(self):
        return self._transfer_created