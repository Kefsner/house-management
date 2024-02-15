from django.contrib.auth.models import User

from finances.messages import FinancesMessages
from finances.models import Category, Subcategory, Transaction, Account, CreditCard

from core.exceptions import CategoryAlreadyExists, SubcategoryAlreadyExists, AccountAlreadyExists

class CategoryServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_category(self) -> dict:
        user = self.data['user']
        name = self.data['name']
        type = self.data['type']
        if Category.objects.filter(type=type, name=name).exists():
            raise CategoryAlreadyExists(self.messages.category_already_exists)
        created_by = User.objects.get(id=user)
        Category.objects.create(name=name, type=type, created_by=created_by)
        payload = { 'success': self.messages.category_created }
        return payload
    

class SubcategoryServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_subcategory(self) -> dict:
        user = self.data['user']
        name = self.data['name']
        category = self.data['category']
        category = Category.objects.get(id=category)
        if Subcategory.objects.filter(name=name, category=category).exists():
            raise SubcategoryAlreadyExists(self.messages.subcategory_already_exists)
        created_by = User.objects.get(id=user)
        Subcategory.objects.create(name=name, category=category, created_by=created_by)
        payload = { 'success': self.messages.subcategory_created }
        return payload
    
class AccountServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_account(self) -> dict:
        user = self.data['user']
        user = User.objects.get(id=user)
        name = self.data['name'].lower()
        initial_balance = self.data['initial_balance']
        balance = initial_balance
        if Account.objects.filter(name=name, user=user).exists():
            raise AccountAlreadyExists(self.messages.account_already_exists)
        created_by = self.data['created_by']
        created_by = User.objects.get(id=created_by)
        Account.objects.create(name=name, initial_balance=initial_balance, balance=balance, user=user, created_by=created_by)
        payload = { 'success': self.messages.account_created }
        return payload

class TransactionServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_transaction(self) -> dict:
        user = self.data['user']
        created_by = User.objects.get(id=user)
        category = self.data['category']
        category = Category.objects.get(id=category)
        subcategory = self.data['subcategory']
        if subcategory:
            subcategory = Subcategory.objects.get(id=subcategory)
        description = self.data['description']
        value = self.data['value']
        date = self.data['date']
        account = self.data['account']
        account = Account.objects.get(id=account)
        Transaction.objects.create(
            description=description,
            value=value,
            category=category,
            subcategory=subcategory,
            date=date,
            account=account,
            created_by=created_by
        )
        if category.type == 'I':
            account.balance += value
        else:
            account.balance -= value
        account.save()
        payload = { 'success': self.messages.transaction_created }
        return payload
    
class CreditCardServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_credit_card(self) -> dict:
        print(self.data)
        return
        user = self.data['user']
        user = User.objects.get(id=user)
        name = self.data['name']
        limit = self.data['limit']
        account = self.data['account']
        account = Account.objects.get(id=account)
        created_by = self.data['created_by']
        created_by = User.objects.get(id=created_by)
        CreditCard.objects.create(name=name, limit=limit, user=user, account=account, created_by=created_by)
        payload = { 'success': self.messages.credit_card_created }
        return payload