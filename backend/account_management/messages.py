from core.messages import CoreMessages

class AccountMessages(CoreMessages):
    _account_created = 'Account created successfully.'

    @property
    def account_created(self):
        return self._account_created