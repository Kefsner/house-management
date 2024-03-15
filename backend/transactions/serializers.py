from rest_framework import serializers
from django.contrib.auth.models import User
from transactions.models import Transaction, Category, Subcategory, Account
import datetime
from decimal import Decimal

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['description', 'value', 'category', 'subcategory', 'date', 'account']

    def to_internal_value(self, data):
        user = User.objects.get(username=data['user'])
        data['user'] = user.id
        data['value'] = Decimal(data['value'])
        return data

class CreditCardTransactionSerializer(serializers.Serializer):
    class Meta:
        model = Transaction
        fields = ['description', 'value', 'category', 'subcategory', 'date', 'installments']
    
    def to_internal_value(self, data):
        user = User.objects.get(username=data['user'])
        data['user'] = user.id
        data['value'] = Decimal(data['value'])
        data['date'] = datetime.datetime.strptime(data['date'], '%Y-%m-%d').date()
        return data

class TransferSerializer(serializers.Serializer):
    from_account = serializers.CharField()
    to_account = serializers.CharField()
    value = serializers.DecimalField(max_digits=10, decimal_places=2)
    
    def to_internal_value(self, data):
        user = User.objects.get(username=data['user'])
        data['user'] = user.id
        data['date'] = datetime.datetime.strptime(data['date'], '%Y-%m-%d').date()
        return data
