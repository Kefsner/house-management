from rest_framework import serializers
from user_authentication.constants import *

from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.

    Validates that a username and password are included in the request.
    This serializer does not directly authenticate a user; it merely validates
    the presence of login credentials.
    """

    # Define fields that the serializer will accept.
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data: dict) -> dict:
        """
        Validate that both username and password are provided.

        This method checks if both 'username' and 'password' are present in the data.
        It's called when `is_valid()` is invoked on the serializer instance.

        Parameters:
        - data (dict): The input data to the serializer.

        Returns:
        - dict: The validated data, if username and password are present.

        Raises:
        - serializers.ValidationError: If either username or password is missing.
        """

        # Attempt to fetch 'username' and 'password' from the input data, defaulting to None if not found.
        username = data.get('username', None)
        password = data.get('password', None)

        # Check if both username and password have been provided.
        if username is None or password is None:
            # If either is missing, raise a ValidationError with a custom message.
            raise serializers.ValidationError('A username and password are required to login.')

        # If validation passes, return the data as-is.
        return {
            'username': username,
            'password': password,
        }

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