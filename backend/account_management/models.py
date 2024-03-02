from django.db import models
from core.models import MetaData
from django.contrib.auth.models import User

class Account(MetaData):
    name = models.CharField(max_length=100)
    initial_balance = models.DecimalField(max_digits=10, decimal_places=2)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='owned_accounts')

    class Meta:
        unique_together = ('name', 'user')