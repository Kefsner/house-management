from rest_framework import serializers
from django.contrib.auth.models import User

from creditcard_management.models import CreditCard, CreditCardTransaction

import datetime
from decimal import Decimal

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['name', 'account', 'due_day', 'limit']
        model = CreditCard

    def to_internal_value(self, data):
        created_by = User.objects.get(username=data['created_by'])
        data['created_by'] = created_by.id
        return data
    
class CreditCardTransactionSerializer(serializers.Serializer):
    class Meta:
        model = CreditCardTransaction
        fields = ['description', 'value', 'category', 'subcategory', 'date', 'installments']
    
    def to_internal_value(self, data):
        user = User.objects.get(username=data['user'])
        data['user'] = user.id
        data['value'] = Decimal(data['value'])
        data['date'] = datetime.datetime.strptime(data['date'], '%Y-%m-%d').date()
        return data