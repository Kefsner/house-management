from django.urls import path

from creditcard_management.views.CreateCreditCard import CreateCreditCardView
from creditcard_management.views.GetCreditCards import GetCreditCardsView
from creditcard_management.views.CreateCreditCardTransaction import CreateCreditCardTransactionView
from creditcard_management.views.GetCreditCardTransactions import GetCreditCardTransactionsView

app_name = 'creditcard_management'

urlpatterns = [
    path('create/', CreateCreditCardView.as_view(), name='create_credit_card'),
    path('get/', GetCreditCardsView.as_view(), name='get_credit_cards'),
    path('<int:credit_card_id>/create/', CreateCreditCardTransactionView.as_view(), name='create_credit_card_transaction'),
    path('<int:credit_card_id>/get/', GetCreditCardTransactionsView.as_view(), name='get_credit_card_transactions'),
]