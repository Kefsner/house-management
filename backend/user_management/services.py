from django.contrib.auth.models import User
from django.db import IntegrityError

from rest_framework.response import Response
from rest_framework import status

from core.services import BaseAuthServices

from user_management.exceptions import *
from user_management.messages import UserManagementMessages

class RegisterServices(BaseAuthServices):
    """
    Service class for handling user registration logic.

    Provides methods to create a new user account and generate JWT tokens
    upon successful registration.

    Attributes:
        messages (UserManagementMessages): An instance of the UserManagementMessages class.
        username (str): The username for the new user account.
        password (str): The password for the new user account.
        confirmPassword (str): The password confirmation for the new user account.
    """
    messages = UserManagementMessages()

    def __init__(self, data: dict) -> None:
        """
        Initialize the RegisterServices instance with user registration data.

        Args:
            data (dict): A dictionary containing 'username', 'password', and
                         potentially other fields required for registration.
        """
        self.username = data['username'].lower()
        self.password = data['password']
        self.confirmPassword = data['confirmPassword']

    def register(self) -> Response:
        """
        Create a new user account and return the registration response.

        Attempts to create a new user with the provided username, password,
        and other registration data. Upon successful registration, generates
        JWT tokens for the new user.

        Raises:
            UserAlreadyExists: If a user with the provided username already exists.
            InvalidPassword: If the password and confirm password do not match or
                            the password does not meet the required criteria.
        Returns:
            Response: The HTTP response containing JWT tokens and a success message
                      upon successful registration, or an error message.
        """
        try:
            password_errors = self.check_password(self.password, self.confirmPassword)
            if password_errors:
                raise InvalidPassword(password_errors)
            user = User.objects.create_user(username=self.username, password=self.password)
            user.save()
            tokens = self.generate_tokens(user)
            payload = {
                'accessToken': tokens['access'],
                'username': user.username,
                'message': self.messages.user_created,
            }
            response = Response(payload, status=status.HTTP_201_CREATED)
            response.set_cookie(
                key='refresh_token',
                value=tokens['refresh'],
                httponly=True,
                # secure=True,
                path='/',
                samesite='Lax',
            )
            return response
        except IntegrityError:
            # This exception is raised if a user with the given username already exists
            raise UserAlreadyExists()

    def check_password(self, password: str, confirmPassword: str) -> list:
        """
        Validate the password and confirm password.

        Args:
            password (str): The password to validate.
            confirmPassword (str): The password confirmation to validate.

        Returns:
            list: A list of error messages for any password validation issues.
        """
        errors = []
        if password != confirmPassword:
            errors.append(self.messages.passwords_do_not_match)
        if any(char.isspace() for char in password):
            errors.append(self.messages.password_has_space)
        if not any(char.isupper() for char in password):
            errors.append(self.messages.password_has_no_uppercase)
        if not any(char.islower() for char in password):
            errors.append(self.messages.password_has_no_lowercase)
        if not any(char.isdigit() for char in password):
            errors.append(self.messages.password_has_no_number)
        if not any(char.isalnum() for char in password):
            errors.append(self.messages.password_has_no_special_char)
        return errors
