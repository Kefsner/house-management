from django.urls import path

from finances.views.CreateCategory import CreateCategoryView
from finances.views.GetCategories import GetCategoriesView
from finances.views.CreateSubcategory import CreateSubcategoryView
from finances.views.GetSubcategories import GetSubcategoriesView
from finances.views.CreateTransaction import CreateTransactionView
from finances.views.GetTransactions import GetTransactionsView

app_name = 'finances'

urlpatterns = [
    path('category/get/', GetCategoriesView.as_view(), name='get_categories'),
    path('category/create/', CreateCategoryView.as_view(), name='create_category'),
    path('subcategory/get/', GetSubcategoriesView.as_view(), name='get_subcategories'),
    path('subcategory/create/', CreateSubcategoryView.as_view(), name='create_subcategory'),
    path('transaction/create/', CreateTransactionView.as_view(), name='create_transaction'),
    path('transaction/get/', GetTransactionsView.as_view(), name='get_transactions')
]