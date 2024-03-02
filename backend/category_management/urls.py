from django.urls import path

from category_management.views.CreateCategory import CreateCategoryView
from category_management.views.GetCategories import GetCategoriesView
from category_management.views.CreateSubcategory import CreateSubcategoryView
from category_management.views.GetSubcategories import GetSubcategoriesView

app_name = 'category_management'

urlpatterns = [
    path('get/', GetCategoriesView.as_view(), name='get_categories'),
    path('create/', CreateCategoryView.as_view(), name='create_category'),
    path('sub/<int:category_id>/get/', GetSubcategoriesView.as_view(), name='get_subcategories'),
    path('sub/<int:category_id>/create/', CreateSubcategoryView.as_view(), name='create_subcategory'),
]