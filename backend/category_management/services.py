from django.contrib.auth.models import User

from category_management.models import Category, Subcategory

class CategoryServices:
    def __init__(self, data) -> None:
        self.data = data

    def create_category(self) -> None:
        user = self.data['user']
        user = User.objects.get(id=user)
        name = self.data['name']
        type = self.data['type'] 
        Category.objects.create(name=name, type=type, created_by=user)

class SubcategoryServices:
    def __init__(self, data: dict, category_id: int) -> None:
        self.data = data
        self.category_id = category_id

    def create_subcategory(self) -> None:
        user = self.data['user']
        user = User.objects.get(id=user)
        category = Category.objects.get(id=self.category_id)
        name = self.data['name']
        description = self.data.get('description', None)
        Subcategory.objects.create(name=name, category=category, description=description, created_by=user)