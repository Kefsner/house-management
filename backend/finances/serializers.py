from rest_framework import serializers
from finances.models import Transaction, Category, Subcategory

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['description', 'value', 'category', 'subcategory', 'date']

    def to_internal_value(self, data):
        category = Category.objects.get(name=data['category'])
        subcategory = Subcategory.objects.get(name=data['subcategory'])
        data['category'] = category.id
        data['subcategory'] = subcategory.id
        return data

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'type']

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ['name', 'category']

    def to_internal_value(self, data):
        category = Category.objects.get(name=data['category'])
        data['category'] = category.id
        return data