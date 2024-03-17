from django.urls import path

from account_management.views.CreateAccount import CreateAccountView
from account_management.views.GetAccounts import GetAccountsView
from account_management.views.CreateTransaction import CreateTransactionView
from account_management.views.GetTransactions import GetTransactionsView
from account_management.views.CreateTransfer import CreateTransferView

app_name = 'account_management'

urlpatterns = [
    path('create/', CreateAccountView.as_view(), name='create_account'),
    path('get/', GetAccountsView.as_view(), name='get_accounts'),
    path('transaction/create/', CreateTransactionView.as_view(), name='create_transaction'),
    path('transaction/get/', GetTransactionsView.as_view(), name='get_transactions'),
    path('transfer/create/', CreateTransferView.as_view(), name='create_transfer'),
]