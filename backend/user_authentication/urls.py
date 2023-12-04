from django.urls import path

from user_authentication.views.LoginView import LoginView

app_name = 'user_authentication'

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
]