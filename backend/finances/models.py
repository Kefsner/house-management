from django.db import models

from django.contrib.auth.models import User

class MetaData(models.Model):
    id = models.AutoField(primary_key=True)
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

class Category(MetaData):
    CATEGORY_TYPES = (
        ('I', 'Income'),
        ('E', 'Expense'),
    )
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=1, choices=CATEGORY_TYPES)

class Subcategory(MetaData):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    description = models.CharField(max_length=100)

class Account(MetaData):
    name = models.CharField(max_length=100)
    initial_balance = models.DecimalField(max_digits=10, decimal_places=2)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='owned_accounts')

class Transaction(MetaData):
    description = models.CharField(max_length=100, null=True)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.DO_NOTHING, null=True)
    date = models.DateField()
    account = models.ForeignKey(Account, on_delete=models.DO_NOTHING)

class CreditCard(MetaData):
    name = models.CharField(max_length=100)
    account = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    due_date = models.IntegerField()
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    remaining_limit = models.DecimalField(max_digits=10, decimal_places=2)
    
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
