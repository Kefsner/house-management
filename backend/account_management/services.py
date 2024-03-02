from django.contrib.auth.models import User

from account_management.messages import AccountMessages
from account_management.models import Account

class AccountServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = AccountMessages()

    def create_account(self) -> None:
        name = self.data['name']
        initial_balance = self.data['initial_balance']
        user = self.data['user']
        user = User.objects.get(id=user)
        created_by = self.data['created_by']
        created_by = User.objects.get(id=created_by)
        Account.objects.create(name=name, initial_balance=initial_balance, balance=initial_balance, user=user, created_by=created_by)