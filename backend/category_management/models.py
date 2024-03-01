from django.db import models

from core.models import MetaData

class Category(MetaData):
    """
    Model for financial transaction categories.

    Attributes:
        name (str): The name of the category.
        type (str): The type of the category. Can be 'I' for income, 'E' for expense or 'T' for transfer.
    """
    CATEGORY_TYPES = (
        ('I', 'Income'),
        ('E', 'Expense'),
        ('T', 'Transfer'),
    )
    name = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=1, choices=CATEGORY_TYPES)

class Subcategory(MetaData):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)

    class Meta:
        unique_together = ('name', 'category')