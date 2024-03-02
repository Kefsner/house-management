from django.urls import path

from account_management.views.CreateAccount import CreateAccountView

app_name = 'account_management'

urlpatterns = [
    path('create/', CreateAccountView.as_view(), name='create_account'),
]