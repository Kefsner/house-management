from django.db import models

from core.models import MetaData

from category_management.models import Category, Subcategory
from creditcard_management.models import CreditCard
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

class CreditCardTransaction(MetaData):
    description = models.CharField(max_length=100, null=True)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.DO_NOTHING, null=True)
    date = models.DateField()
    credit_card = models.ForeignKey(CreditCard, on_delete=models.DO_NOTHING, related_name='transactions')
    installments = models.IntegerField()

class CreditCardInstallment(MetaData):
    credit_card_transaction = models.ForeignKey(CreditCardTransaction, on_delete=models.DO_NOTHING, related_name='transaction_installments')
    value = models.FloatField()
    due_date = models.DateField()
    installment_number = models.IntegerField()
    paid = models.BooleanField(default=False)