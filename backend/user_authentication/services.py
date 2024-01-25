from django.contrib.auth.models import User

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

from user_authentication.messages import UserAuthenticationMessages
from user_authentication.constants import *

class UserAuthenticationValidator:
    @staticmethod
    def username_length_is_valid(username: str) -> bool:
        return MIN_USERNAME_LENGHT <= len(username) <= MAX_USERNAME_LENGHT
    
    @staticmethod
    def username_already_exists(username: str) -> bool:
        return User.objects.filter(username=username).exists()

    @staticmethod
    def password_length_is_valid(password: str) -> bool:
        return MIN_PASSWORD_LENGHT <= len(password) <= MAX_PASSWORD_LENGHT
    
    @staticmethod
    def password_has_uppercase(password: str) -> bool:
        return any(char.isupper() for char in password)
    
    @staticmethod
    def password_has_lowercase(password: str) -> bool:
        return any(char.islower() for char in password)
    
    @staticmethod
    def password_has_number(password: str) -> bool:
        return any(char.isdigit() for char in password)
    
    @staticmethod
    def password_has_special_char(password: str) -> bool:
        return any(not char.isalnum() for char in password)
    
    @staticmethod
    def password_has_space(password: str) -> bool:
        return any(char.isspace() for char in password)

class UserAuthenticationServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.data['username'] = self.data['username'].lower()
        self.messages = UserAuthenticationMessages()
        self.validator = UserAuthenticationValidator()
        self.response = {}

    def login(self) -> Response:
        username = self.data['username']
        password = self.data['password']
        user = User.objects.get(username=username)

        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            self.response['payload'] = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'success': self.messages.login_success
            }
            self.response['status'] = status.HTTP_200_OK
        else:
            self.response['payload'] = {
                'error': self.messages.invalid_credentials
            }
            self.response['status'] = status.HTTP_401_UNAUTHORIZED
        return Response(self.response['payload'], self.response['status'])

    def register(self) -> Response:
        username = self.data['username']
        password = self.data['password']
        confirm_password = self.data['confirmPassword']

        errors = []

        if not self.validator.username_length_is_valid(username):
            errors.append(self.messages.username_length_invalid)
        if self.validator.username_already_exists(username):
            errors.append(self.messages.username_already_exists)
        if not self.validator.password_length_is_valid(password):
            errors.append(self.messages.password_length_invalid)
        if not self.validator.password_has_uppercase(password):
            errors.append(self.messages.password_has_no_uppercase)
        if not self.validator.password_has_lowercase(password):
            errors.append(self.messages.password_has_no_lowercase)
        if not self.validator.password_has_number(password):
            errors.append(self.messages.password_has_no_number)
        if not self.validator.password_has_special_char(password):
            errors.append(self.messages.password_has_no_special_char)
        if self.validator.password_has_space(password):
            errors.append(self.messages.password_has_space)
        if password != confirm_password:
            errors.append(self.messages.passwords_do_not_match)
        
        if errors:
            self.response['payload'] = { 'error': errors }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
        else:
            User.objects.create_user(username=username, password=password)
            self.response['payload'] = { 'success': self.messages.register_success }
            self.response['status'] = status.HTTP_201_CREATED
        return Response(self.response['payload'], self.response['status'])