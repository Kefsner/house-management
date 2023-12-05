from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.contrib.auth.models import User
from django.contrib.auth import login

from user_authentication.messages import UserAuthenticationMessages

import json


class LoginView(APIView):
    def post(self, request):
        messages = UserAuthenticationMessages()
        try:
            data = json.loads(request.body)
            username = data['username']
            password = data['password']

        except (KeyError, json.JSONDecodeError):
            message = messages.bad_request
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        except:
            message = messages.internal_server_error
            return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            user = User.objects.get(username=username)
            
            if user.check_password(password):
                login(request, user)
                message = messages.login_success
                return Response(message, status=status.HTTP_200_OK)
            else:
                message = messages.invalid_password
                return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        except User.DoesNotExist:
            message = messages.user_not_found
            return Response(message, status=status.HTTP_404_NOT_FOUND)

        except:
            message = messages.internal_server_error
            return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)