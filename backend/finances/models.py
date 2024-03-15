from django.db import models
from django.contrib.auth.models import User

from category_management.models import Category, Subcategory

from core.models import MetaData
from account_management.models import Account

class Transaction(MetaData):
    description = models.CharField(max_length=100, null=True)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.DO_NOTHING, null=True)
    date = models.DateField()
    account = models.ForeignKey(Account, on_delete=models.DO_NOTHING)

class Transfer(MetaData):
    value = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    from_account = models.ForeignKey(Account, on_delete=models.DO_NOTHING, related_name='transfers_sent')
    to_account = models.ForeignKey(Account, on_delete=models.DO_NOTHING, related_name='transfers_received')

class RecurrentTransaction(MetaData):
    description = models.CharField(max_length=100)
    mean_value = models.DecimalField(max_digits=10, decimal_places=2)
    last_value = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.DO_NOTHING, null=True)
    due_date = models.DateField()
    active = models.BooleanField(default=True)
    interval = models.IntegerField()
    interval_type = models.CharField(max_length=1, choices=[('D', 'Days'), ('W', 'Weeks'), ('M', 'Months'), ('Y', 'Years')])