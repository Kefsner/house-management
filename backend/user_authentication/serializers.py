from rest_framework import serializers
from user_authentication.constants import *

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=MAX_USERNAME_LENGHT,
        min_length=MIN_USERNAME_LENGHT,
        required=True,
    )
    password = serializers.CharField(
        max_length=MAX_PASSWORD_LENGHT,
        min_length=MIN_PASSWORD_LENGHT,
        required=True,
    )
    confirmPassword = serializers.CharField(
        max_length=MAX_PASSWORD_LENGHT,
        min_length=MIN_PASSWORD_LENGHT,
        required=True,
        write_only=True
    )