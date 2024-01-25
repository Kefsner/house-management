from django.urls import path

from finances.views.CreateTransaction import CreateTransactionView
from finances.views.GetCategories import GetCategoriesView

app_name = 'finances'

urlpatterns = [
    path('category/get/', GetCategoriesView.as_view(), name='get_categories'),
    path('transaction/create/', CreateTransactionView.as_view(), name='create_transaction'),
]