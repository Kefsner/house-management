from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from user_authentication.messages import UserAuthenticationMessages
from core.exceptions import InvalidCredentials, InvalidPassword, UserAlreadyExists

class AuthServices():
    def __init__(self, data: dict) -> None:
        self.data = data
        self.messages = UserAuthenticationMessages()

    def login(self) -> dict:
        username = self.data['username']
        password = self.data['password']
        user = User.objects.get(username=username)
        if not user.check_password(password):
            raise InvalidCredentials()
        refresh = RefreshToken.for_user(user)
        payload = {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
        return payload
    
    def register(self) -> dict:
        username = self.data['username']
        password = self.data['password']
        confirmPassword = self.data['confirmPassword']
        if User.objects.filter(username=username).exists():
            raise UserAlreadyExists(self.messages.username_already_exists)
        self.check_password(password, confirmPassword)
        User.objects.create_user(username=username, password=password)
        payload = { 'success': self.messages.register_success }
        return payload
    
    def check_password(self, password: str, confirmPassword: str) -> None:
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
        if errors:
            raise InvalidPassword(errors)