from django.urls import path

from finances.views.CreateCategory import CreateCategoryView
from finances.views.GetCategories import GetCategoriesView
from finances.views.CreateSubcategory import CreateSubcategoryView
from finances.views.GetSubcategories import GetSubcategoriesView
from finances.views.CreateTransaction import CreateTransactionView
from finances.views.GetTransactions import GetTransactionsView
from finances.views.CreateAccount import CreateAccountView
from finances.views.GetAccounts import GetAccountsView
from finances.views.CreateCreditCard import CreateCreditCardView
from finances.views.GetCreditCards import GetCreditCardsView
from finances.views.CreateCreditCardTransaction import CreateCreditCardTransactionView
from finances.views.GetCreditCardTransactions import GetCreditCardTransactionsView

app_name = 'finances'

urlpatterns = [
    path('category/get/', GetCategoriesView.as_view(), name='get_categories'),
    path('category/create/', CreateCategoryView.as_view(), name='create_category'),
    # path('subcategory/get/', GetSubcategoriesView.as_view(), name='get_subcategories'),
    path('subcategory/create/', CreateSubcategoryView.as_view(), name='create_subcategory'),
    path('transaction/create/', CreateTransactionView.as_view(), name='create_transaction'),
    path('transaction/get/', GetTransactionsView.as_view(), name='get_transactions'),
    path('account/create/', CreateAccountView.as_view(), name='create_account'),
    path('account/get/', GetAccountsView.as_view(), name='get_accounts'),
    path('credit_card/create/', CreateCreditCardView.as_view(), name='create_credit_card'),
    path('credit_card/get/', GetCreditCardsView.as_view(), name='get_credit_cards'),
    path('credit_card/create_transaction/', CreateCreditCardTransactionView.as_view(), name='create_credit_card_transaction'),
    path('credit_card/get_transactions/<int:credit_card_id>/', GetCreditCardTransactionsView.as_view(), name='get_credit_card_transactions'),
]