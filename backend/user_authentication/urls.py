from django.urls import path

from user_authentication.views.Logout import LogoutView
from user_authentication.views.Login import LoginView
from user_authentication.views.Status import StatusView
from user_authentication.views.Refresh import RefreshView

app_name = 'user_authentication'

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('status/', StatusView.as_view(), name='status'),
    path('refresh/', RefreshView.as_view(), name='refresh'),
]