from django.contrib.auth.models import User

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

from user_authentication.messages import UserAuthenticationMessages
from user_authentication.constants import *

class UserAuthenticationDataValidation:
    def __init__(self) -> None:
        self.messages = UserAuthenticationMessages()
        self.response = {}

    @staticmethod
    def username_length_is_valid(username: str) -> bool:
        return len(username) >= MIN_USERNAME_LENGHT \
            and len(username) <= MAX_USERNAME_LENGHT
    
    @staticmethod
    def password_length_is_valid(password: str) -> bool:
        return len(password) >= MIN_PASSWORD_LENGHT \
            and len(password) <= MAX_PASSWORD_LENGHT
    
    @staticmethod
    def username_already_exists(username: str) -> bool:
        return User.objects.filter(username=username).exists()
    
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

    def can_login(self, user: User, password: str) -> bool:
        if not user.check_password(password):
            self.response['payload'] = {
                'error': self.messages.invalid_credentials
            }
            self.response['status'] = status.HTTP_401_UNAUTHORIZED
            return False
        return True

    def can_register(self, username: str, password: str, confirm_password: str) -> bool:
        
        if not self.username_length_is_valid(username):
            self.response['payload'] = {
                'error': self.messages.username_length_invalid
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False

        if not self.password_length_is_valid(password):
            self.response['payload'] = {
                'error': self.messages.password_length_invalid
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False
        
        if self.username_already_exists(username):
            self.response['payload'] = {
                'error': self.messages.username_already_exists
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False
        
        if not self.password_has_uppercase(password):
            self.response['payload'] = {
                'error': self.messages.password_has_no_uppercase
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False
        
        if not self.password_has_lowercase(password):
            self.response['payload'] = {
                'error': self.messages.password_has_no_lowercase
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False
        
        if not self.password_has_number(password):
            self.response['payload'] = {
                'error': self.messages.password_has_no_number
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False
        
        # if not self.password_has_special_char(password):
        #     self.response['payload'] = {
        #         'error': self.messages.password_has_no_special_char
        #     }
        #     self.response['status'] = status.HTTP_400_BAD_REQUEST
        #     return False
        
        if self.password_has_space(password):
            self.response['payload'] = {
                'error': self.messages.password_has_space
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False
        
        if password != confirm_password:
            self.response['payload'] = {
                'error': self.messages.passwords_do_not_match
            }
            self.response['status'] = status.HTTP_400_BAD_REQUEST
            return False
        
        return True

class UserAuthenticationServices(UserAuthenticationDataValidation):
    def __init__(self, data: dict) -> None:
        super().__init__()
        self.data = data

    def login(self) -> Response:
        username = self.data['username'].lower()
        password = self.data['password']
        user = User.objects.get(username=username)

        if self.can_login(user, password):
            refresh = RefreshToken.for_user(user)
            self.response['payload'] = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': self.messages.login_success
            }
            self.response['status'] = status.HTTP_200_OK
        return Response(self.response['payload'], self.response['status'])
        
    def register(self) -> Response:
        username = self.data['username'].lower()
        password = self.data['password']
        confirm_password = self.data['confirmPassword']
    
        if self.can_register(username, password, confirm_password):
            user = User.objects.create_user(username=username, password=password)
            user.save()
            self.response['payload'] = {
                'message': self.messages.register_success
            }
            self.response['status'] = status.HTTP_201_CREATED
        return Response(self.response['payload'], self.response['status'])