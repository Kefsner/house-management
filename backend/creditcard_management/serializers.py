from rest_framework import serializers
from django.contrib.auth.models import User

from creditcard_management.models import CreditCard

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['name', 'account', 'due_day', 'limit']
        model = CreditCard

    def to_internal_value(self, data):
        created_by = User.objects.get(username=data['created_by'])
        data['created_by'] = created_by.id
        return data