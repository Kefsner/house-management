from django.urls import path, include

urlpatterns = [
    path('auth/', include('user_authentication.urls')),
    path('users/', include('user_management.urls')),
    path('categories/', include('category_management.urls')),
    path('accounts/', include('account_management.urls')),
    path('credit_cards/', include('creditcard_management.urls')),
    path('transactions/', include('transactions.urls')),
]
