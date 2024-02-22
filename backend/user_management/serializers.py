from rest_framework import serializers
from core.constants import *

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=MAX_USERNAME_LENGTH,
        min_length=MIN_USERNAME_LENGTH,
        required=True,
    )
    password = serializers.CharField(
        max_length=MAX_PASSWORD_LENGTH,
        min_length=MIN_PASSWORD_LENGTH,
        required=True,
    )
    confirmPassword = serializers.CharField(
        max_length=MAX_PASSWORD_LENGTH,
        min_length=MIN_PASSWORD_LENGTH,
        required=True,
        write_only=True
    )