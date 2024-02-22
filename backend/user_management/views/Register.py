from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from user_management.messages import UserManagementMessages
from user_management.serializers import RegisterSerializer
from user_management.services import RegisterServices
from user_management.exceptions import *

import logging

class RegisterView(APIView):
    """
    A view that handles user registration requests.

    This view accepts POST requests containing user registration data, validates this data,
    and attempts to register a new user based on the provided information. It leverages the
    RegisterSerializer for data validation and the RegisterServices for executing the registration
    logic. Responses vary based on the outcome of the registration process, including successful
    registration, validation errors, or server errors.

    Permissions:
        AllowAny: No authentication is required to access this view, allowing any user to attempt registration.

    Responses:
        200 OK: Returns a success message and user data upon successful registration.
        400 Bad Request: Returned if the submitted data is invalid, including custom validation errors like invalid passwords.
        409 Conflict: Returned if attempting to register a user that already exists.
        500 Internal Server Error: Returned if an unexpected error occurs during the process.
    """
    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        messages = UserManagementMessages()
        logger = logging.getLogger('django')
        try:
            serializer = RegisterSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.validated_data
            services = RegisterServices(data)
            return services.register()
        except ValidationError as e:
            payload = {'message': messages.bad_request}
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except InvalidPassword as e:
            payload = {'message': str(e)}
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except UserAlreadyExists:
            payload = {'message': messages.user_already_exists}
            return Response(payload, status.HTTP_409_CONFLICT)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = {'message': messages.internal_server_error}
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)
