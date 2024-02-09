from rest_framework import serializers
from django.contrib.auth.models import User
from finances.models import Transaction, Category, Subcategory, Account, CreditCard
from decimal import Decimal

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['description', 'value', 'category', 'subcategory', 'date', 'account']

    def to_internal_value(self, data):
        category = Category.objects.get(name=data['category'])
        if data['subcategory'] == 'None':
            subcategory = None
        else:
            subcategory = Subcategory.objects.get(name=data['subcategory'])
        account = Account.objects.get(name=data['account'])
        data['category'] = category.id
        data['subcategory'] = subcategory.id
        data['account'] = account.id
        data['value'] = Decimal(data['value'])
        return data

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'type']

    def to_internal_value(self, data):
        user = User.objects.get(username=data['user'])
        data['user'] = user.id
        return data

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ['name', 'category']

    def to_internal_value(self, data):
        category = Category.objects.get(name=data['category'])
        data['category'] = category.id
        user = User.objects.get(username=data['user'])
        data['user'] = user.id
        return data

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['name', 'balance', 'user']

    def to_internal_value(self, data):
        user = User.objects.get(id=data['user'])
        data['user'] = user.id
        return data
    
class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ['name', 'limit', 'user', 'account']

    def to_internal_value(self, data):
        user = User.objects.get(username=data['user'])
        account = Account.objects.get(name=data['account'])
        data['user'] = user.id
        data['account'] = account.id
        return data