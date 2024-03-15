from django.db import models
from core.models import MetaData

from account_management.models import Account
from category_management.models import Category, Subcategory

class CreditCard(MetaData):
    name = models.CharField(max_length=100)
    account = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    due_day = models.IntegerField()
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    remaining_limit = models.DecimalField(max_digits=10, decimal_places=2)