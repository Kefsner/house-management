from django.contrib.auth.models import User

from finances.messages import FinancesMessages
from finances.models import Category, Subcategory, Transaction

from core.exceptions import CategoryAlreadyExists, SubcategoryAlreadyExists

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
        created_by = User.objects.get(username=user)
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
        created_by = User.objects.get(username=user)
        Subcategory.objects.create(name=name, category=category, created_by=created_by)
        payload = { 'success': self.messages.subcategory_created }
        return payload

class TransactionServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_transaction(self) -> dict:
        user = self.data['user']
        created_by = User.objects.get(username=user)
        category = self.data['category']
        category = Category.objects.get(id=category)
        subcategory = self.data['subcategory']
        subcategory = Subcategory.objects.get(id=subcategory)
        description = self.data['description']
        value = self.data['value']
        date = self.data['date']
        Transaction.objects.create(description=description, value=value, category=category, subcategory=subcategory, date=date, created_by=created_by)
        payload = { 'success': self.messages.transaction_created }
        return payload