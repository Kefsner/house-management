from django.urls import path

from user_authentication.views.RegisterView import RegisterView
from user_authentication.views.LogoutView import LogoutView
from user_authentication.views.LoginView import LoginView

app_name = 'user_authentication'

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout')
]