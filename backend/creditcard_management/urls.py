from django.urls import path

from creditcard_management.views.CreateCreditCard import CreateCreditCardView
from creditcard_management.views.GetCreditCards import GetCreditCardsView

app_name = 'creditcard_management'

urlpatterns = [
    path('create/', CreateCreditCardView.as_view(), name='create_credit_card'),
    path('get/', GetCreditCardsView.as_view(), name='get_credit_cards'),
]