from django.contrib.auth.models import User

from account_management.models import Account, Transaction, Transfer
from category_management.models import Category, Subcategory

from core.exceptions import InsufficientFunds

from django.db import transaction

class AccountServices():
    def __init__(self, data: dict) -> None:
        self.data = data

    def create_account(self) -> None:
        name = self.data['name']
        initial_balance = self.data['initial_balance']
        user = self.data['user']
        user = User.objects.get(id=user)
        created_by = self.data['created_by']
        created_by = User.objects.get(id=created_by)
        Account.objects.create(name=name, initial_balance=initial_balance, balance=initial_balance, user=user, created_by=created_by)

    def create_transaction(self) -> dict:
        created_by = self.data['user']
        created_by = User.objects.get(id=created_by)
        description = self.data['description']
        category = self.data['category']
        category = Category.objects.get(id=category)
        subcategory = self.data.get('subcategory', None)
        if subcategory:
            subcategory = Subcategory.objects.get(id=subcategory)
        value = self.data['value']
        date = self.data['date']
        account = self.data['account']
        account = Account.objects.get(id=account)
        with transaction.atomic():
            Transaction.objects.create(
                description=description,
                value=value,
                category=category,
                subcategory=subcategory,
                date=date,
                account=account,
                created_by=created_by
            )
            if category.type == 'income':
                account.balance += value
            elif category.type == 'expense':
                account.balance -= value
            account.save()

    def create_transfer(self) -> dict:
        created_by = self.data['user']
        created_by = User.objects.get(id=created_by)
        value = self.data['value']
        date = self.data['date']
        from_account = self.data['from_account']
        from_account = Account.objects.get(id=from_account)
        to_account = self.data['account']
        to_account = Account.objects.get(id=to_account)
        if from_account.balance < value:
            raise InsufficientFunds
        with transaction.atomic():
            Transfer.objects.create(
                value=value,
                from_account=from_account,
                to_account=to_account,
                date=date,
                created_by=created_by
            )
            from_account.balance -= value
            to_account.balance += value
            from_account.save()
            to_account.save()
