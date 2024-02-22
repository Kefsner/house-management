from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.contrib.auth.models import User

from django.http.response import HttpResponse
from django.http.request import HttpRequest

from user_authentication.messages import UserAuthenticationMessages
from user_authentication.exceptions import InvalidCredentials
from user_authentication.serializers import LoginSerializer
from user_authentication.services import AuthServices

import logging
import traceback

class LoginView(APIView):
    """
    View for user login handling.

    Allows any user to attempt login, validates the provided credentials, and
    returns JWT tokens upon successful authentication or appropriate error
    responses otherwise.
    """
    permission_classes = [AllowAny]

    def post(self, request: HttpRequest) -> HttpResponse:
        """
        Handle POST request to authenticate a user.

        Validates user credentials via a serializer. If valid, attempts to log the
        user in and issue JWT tokens. Handles various exceptions to return the
        appropriate HTTP response.

        Args:
            request (HttpRequest): The request object containing user credentials.

        Returns:
            HttpResponse: JWT access and refresh tokens upon successful login or
            an error status code for failed attempts.
        """
        messages = UserAuthenticationMessages()
        try:
            serializer = LoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.validated_data
            services = AuthServices(data)
            return services.login()
        except ValidationError:
            payload = { 'message': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except (User.DoesNotExist, InvalidCredentials):
            payload = { 'message': messages.invalid_credentials }
            return Response(payload, status.HTTP_401_UNAUTHORIZED) 
        except:
            logging.error(traceback.format_exc())
            payload = { 'message': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)