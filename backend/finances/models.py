from django.db import models

from django.contrib.auth.models import User

class MetaData(models.Model):
    id = models.AutoField(primary_key=True)
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

class Category(MetaData):
    type = models.CharField(max_length=1) # 'I' for income and 'E' for expense
    description = models.CharField(max_length=100)

class Subcategory(MetaData):
    description = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)

class Transaction(MetaData):
    description = models.CharField(max_length=100)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.DO_NOTHING)
    date = models.DateField()
