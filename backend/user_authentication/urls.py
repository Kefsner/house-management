from django.urls import path

from user_authentication.views.Register import RegisterView
from user_authentication.views.Logout import LogoutView
from user_authentication.views.Login import LoginView

app_name = 'user_authentication'

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout')
]