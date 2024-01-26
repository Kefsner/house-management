from rest_framework.response import Response
from rest_framework import status

from finances.messages import TransactionMessages

from finances.models import Transaction, Category, Subcategory

import datetime

class TransactionDataValidation:
    def __init__(self) -> None:
        self.messages = TransactionMessages()
        self.response = {}

    @staticmethod
    def description_is_valid(description: str) -> bool:
        return len(description) <= 100
    
    @staticmethod
    def value_is_valid(value: float) -> bool:
        return value > 0

    def can_create_transaction(self, data: dict) -> bool:
        if not self.description_is_valid(data['description']):
            self.response['payload'] = {
                'error': self.messages.description_length_invalid
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False
        
        if not self.value_is_valid(data['value']):
            self.response['payload'] = {
                'error': self.messages.value_invalid
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False
        
        return True

class TransactionServices(TransactionDataValidation):
    def __init__(self, data: dict) -> None:
        super().__init__()
        self.data = self.set_dtypes(data)

    def create_transaction(self):
        return
        if self.can_create_transaction(self.data):
            Transaction.objects.create(
            )
            self.response['payload'] = {
                'message': self.messages.created
            }
            self.response['status'] = status.HTTP_201_CREATED
        return Response(self.response['payload'], self.response['status'])
    
    def set_dtypes(self, data: dict) -> dict:
        data['value'] = float(data['value'])
        data['category'] = Category.objects.get(id=data['category'])
        data['subcategory'] = Subcategory.objects.get(id=data['subcategory'])
        data['date'] = datetime.strptime(data['date'], '%Y-%m-%d').date()
        return data
    
class CategoryServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = TransactionMessages()
        self.response = {}

    def create_category(self):
        return
        if self.can_create_category(self.data):
            Category.objects.create(
                description=self.data['description'],
                type=self.data['type']
            )
            self.response['payload'] = {
                'message': self.messages.created
            }
            self.response['status'] = status.HTTP_201_CREATED
        return Response(self.response['payload'], self.response['status'])
    
    def can_create_category(self, data: dict) -> bool:
        if not self.description_is_valid(data['description']):
            self.response['payload'] = {
                'error': self.messages.description_length_invalid
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False
        
        if not self.type_is_valid(data['type']):
            self.response['payload'] = {
                'error': self.messages.type_invalid
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False
        
        return True
    
    @staticmethod
    def type_is_valid(type: str) -> bool:
        return type in ['I', 'E']