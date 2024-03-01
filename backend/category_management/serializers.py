from rest_framework import serializers
from django.contrib.auth.models import User
from category_management.models import Category, Subcategory

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'type']

    def to_internal_value(self, data):
        user = User.objects.get(username=data['user'])
        data['user'] = user.id
        data['type'] = data['type'][0].upper()
        data['name'] = data['name'].lower()
        return data

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ['name', 'category']

    def to_internal_value(self, data):
        user = User.objects.get(username=data['user'])
        data['user'] = user.id
        category = Category.objects.get(name=data['category'])
        data['category'] = category.id
        data['name'] = data['name'].lower()
        return data