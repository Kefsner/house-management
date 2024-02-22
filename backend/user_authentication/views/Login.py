from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from django.contrib.auth.models import User

from user_authentication.messages import UserAuthenticationMessages
from user_authentication.exceptions import InvalidCredentials
from user_authentication.serializers import LoginSerializer
from user_authentication.services import AuthServices

import logging

class LoginView(APIView):
    """
    View for user login handling.

    This view allows any user to attempt login, validates the provided credentials via the
    LoginSerializer, and returns JWT tokens upon successful authentication. If authentication fails,
    it returns an appropriate error response. This class uses the AllowAny permission class to ensure
    that any user can attempt to log in.
    """
    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        """
        Handle POST request to authenticate a user.

        This method validates user credentials using the LoginSerializer. If the credentials are valid,
        it attempts to log the user in and issue JWT tokens. It handles various exceptions to return the
        appropriate HTTP response, including bad requests, invalid credentials, and internal server errors.

        Args:
            request (Request): The DRF request object containing user credentials.

        Returns:
            Response: A DRF Response object. On successful login, it includes JWT access and refresh tokens.
            On failure, it returns an error message and an HTTP status code indicating the nature of the failure
            (e.g., 400 for bad requests, 401 for invalid credentials, 500 for internal server errors).
        """
        messages = UserAuthenticationMessages()
        logger = logging.getLogger('django')
        try:
            serializer = LoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.validated_data
            services = AuthServices(data)
            return services.login()
        except ValidationError:
            payload = {'message': messages.bad_request}
            return Response(payload, status=status.HTTP_400_BAD_REQUEST)
        except (User.DoesNotExist, InvalidCredentials):
            payload = {'message': messages.invalid_credentials}
            return Response(payload, status=status.HTTP_401_UNAUTHORIZED) 
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = {'message': messages.internal_server_error}
            return Response(payload, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
