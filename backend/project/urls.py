from django.urls import path, include

urlpatterns = [
    path('auth/', include('user_authentication.urls')),
    path('finances/', include('finances.urls')),
]
