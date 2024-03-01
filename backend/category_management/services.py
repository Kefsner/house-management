from django.contrib.auth.models import User

from category_management.models import Category, Subcategory
from category_management.messages import CategoryMessages

class CategoryServices:
    def __init__(self, data) -> None:
        self.data = data
        self.messages = CategoryMessages()

    def create_category(self) -> None:
        user = self.data['user']
        user = User.objects.get(id=user)
        name = self.data['name']
        type = self.data['type'] 
        Category.objects.create(name=name, type=type, created_by=user)

class SubcategoryServices:
    def __init__(self, data) -> None:
        self.data = data
        self.messages = CategoryMessages()

    def create_subcategory(self) -> None:
        pass