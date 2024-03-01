from django.urls import path

from category_management.views.CreateCategory import CreateCategoryView
from category_management.views.GetCategories import GetCategoriesView
from category_management.views.CreateSubcategory import CreateSubcategoryView
from category_management.views.GetSubcategories import GetSubcategoriesView

app_name = 'category_management'

urlpatterns = [
    path('category/get/', GetCategoriesView.as_view(), name='get_categories'),
    path('category/create/', CreateCategoryView.as_view(), name='create_category'),
    path('subcategory/get/', GetSubcategoriesView.as_view(), name='get_subcategories'),
    path('subcategory/create/', CreateSubcategoryView.as_view(), name='create_subcategory'),
]