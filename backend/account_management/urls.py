from django.urls import path

from account_management.views.CreateAccount import CreateAccountView
from account_management.views.GetAccounts import GetAccountsView

app_name = 'account_management'

urlpatterns = [
    path('create/', CreateAccountView.as_view(), name='create_account'),
    path('get/', GetAccountsView.as_view(), name='get_accounts'),
]