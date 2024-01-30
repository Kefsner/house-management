from django.contrib.auth.models import User

from finances.messages import FinancesMessages
from finances.models import Category, Subcategory

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