from django.urls import path

from user_management.views.Register import RegisterView
app_name = 'user_management'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
]