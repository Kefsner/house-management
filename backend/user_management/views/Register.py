from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from core.exceptions import SerializerError, InvalidPassword, UserAlreadyExists

from user_authentication.serializers import RegisterSerializer
from user_authentication.services import AuthServices
from user_authentication.messages import UserAuthenticationMessages

import traceback
import json

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request: Request) -> Response:
        messages = UserAuthenticationMessages()
        try:
            data = json.loads(request.body)
            serializer = RegisterSerializer(data=data)
            if not serializer.is_valid():
                raise SerializerError
            services = AuthServices(data)
            payload = services.register()
            return Response(payload, status.HTTP_201_CREATED)
        except (json.JSONDecodeError, KeyError, SerializerError, InvalidPassword) as e:
            if isinstance(e, InvalidPassword):
                payload = { 'error': e.args[0] }
            else:
                payload = { 'error': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except UserAlreadyExists:
            payload = { 'error': messages.username_already_exists }
            return Response(payload, status.HTTP_409_CONFLICT)
        except:
            payload = { 'error': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)
        


    # def register(self) -> dict:
    #     username = self.data['username'].lower()
    #     password = self.data['password']
    #     confirmPassword = self.data['confirmPassword']
    #     if User.objects.filter(username=username).exists():
    #         raise UserAlreadyExists(self.messages.username_already_exists)
    #     self.check_password(password, confirmPassword)
    #     user = User.objects.create_user(username=username, password=password)
    #     admin = User.objects.get(username='admin')
    #     Account.objects.create(name='Wallet', user=user, initial_balance=0, created_by=admin, balance=0)
    #     payload = { 'success': self.messages.register_success }
    #     return payload
    
    # def check_password(self, password: str, confirmPassword: str) -> None:
    #     errors = []
    #     if password != confirmPassword:
    #         errors.append(self.messages.passwords_do_not_match)
    #     if any(char.isspace() for char in password):
    #         errors.append(self.messages.password_has_space)
    #     if not any(char.isupper() for char in password):
    #         errors.append(self.messages.password_has_no_uppercase)
    #     if not any(char.islower() for char in password):
    #         errors.append(self.messages.password_has_no_lowercase)
    #     if not any(char.isdigit() for char in password):
    #         errors.append(self.messages.password_has_no_number)
    #     if not any(char.isalnum() for char in password):
    #         errors.append(self.messages.password_has_no_special_char)
    #     if errors:
    #         raise InvalidPassword(errors)