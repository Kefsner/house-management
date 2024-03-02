from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from account_management.serializers import AccountSerializer
from account_management.services import AccountServices
from account_management.messages import AccountMessages

from django.db import IntegrityError

import logging

class CreateAccountView(APIView):
    """
    View for creating an account.

    This view allows authenticated users to create an account. It uses the IsAuthenticated permission class
    to ensure that only authenticated users can access the view.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Handle POST request to create an account.

        This method validates the provided data using the AccountSerializer and creates an account
        using the AccountServices. It handles various exceptions to return the appropriate HTTP response,
        including bad requests, integrity errors, and internal server errors.

        Args:
            request (Request): The DRF request object containing account data.

        Returns:
            Response: A DRF Response object. On success, it includes a success message and an HTTP status code
            indicating the nature of the success (e.g., 201 for created). On failure, it returns an error message
            and an HTTP status code indicating the nature of the failure (e.g., 400 for bad requests, 409 for
            integrity errors, 500 for internal server errors).
        """
        messages = AccountMessages()
        logger = logging.getLogger('django')
        try:
            serializer = AccountSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.validated_data
            services = AccountServices(data)
            services.create_account()
            payload = { 'message': messages.account_created }
            return Response(payload, status.HTTP_201_CREATED)
        except ValidationError:
            payload = { 'message': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            payload = { 'message': messages.integrity_error }
            return Response(payload, status.HTTP_409_CONFLICT)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'message': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)