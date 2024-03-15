from django.urls import path

from transactions.views.CreateTransaction import CreateTransactionView
from transactions.views.GetTransactions import GetTransactionsView
from transactions.views.CreateCreditCardTransaction import CreateCreditCardTransactionView
from transactions.views.GetCreditCardTransactions import GetCreditCardTransactionsView
from transactions.views.CreateTransfer import CreateTransferView

app_name = 'transactions'

urlpatterns = [
    path('create/', CreateTransactionView.as_view(), name='create_transaction'),
    path('get/', GetTransactionsView.as_view(), name='get_transactions'),
    path('<int:credit_card_id>/create/', CreateCreditCardTransactionView.as_view(), name='create_credit_card_transaction'),
    path('<int:credit_card_id>/get/', GetCreditCardTransactionsView.as_view(), name='get_credit_card_transactions'),
    path('transfer/', CreateTransferView.as_view(), name='create_transfer'),
]