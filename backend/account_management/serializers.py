from rest_framework import serializers
from django.contrib.auth.models import User

from account_management.models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['name', 'initial_balance', 'user', 'created_by']
        model = Account

    def to_internal_value(self, data):
        created_by = User.objects.get(username=data['created_by'])
        data['created_by'] = created_by.id
        user = User.objects.get(username=data['user'])
        data['user'] = user.id
        return data