from django.contrib.auth.models import User

from finances.messages import FinancesMessages
from finances.models import Category

from core.exceptions import CategoryAlreadyExists

class CategoryServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = FinancesMessages()

    def create_category(self) -> dict:
        user = self.data['user']
        type = self.data['type']
        description = self.data['description']
        if Category.objects.filter(type=type, description=description).exists():
            raise CategoryAlreadyExists(self.messages.category_already_exists)
        created_by = User.objects.get(username=user)
        Category.objects.create(type=type, description=description, created_by=created_by)
        payload = { 'success': self.messages.category_created }
        return payload