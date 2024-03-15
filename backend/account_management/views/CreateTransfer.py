from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from account_management.serializers import TransferSerializer
from account_management.services import AccountServices
from account_management.messages import AccountMessages

from core.exceptions import InsufficientFunds

import logging

class CreateTransferView(APIView):
    """
    View for creating a transfer.

    This view allows authenticated users to create a transfer. It uses the IsAuthenticated permission class
    to ensure that only authenticated users can access the view.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        """
        Handle POST request to create a transfer.

        This method validates the provided data using the TransferSerializer and creates a transfer
        using the TransferServices. It handles various exceptions to return the appropriate HTTP response,
        including bad requests, account does not exist, insufficient funds, and internal server errors.

        Args:
            request (Request): The DRF request object containing transfer data.

        Returns:
            Response: A DRF Response object. On success, it includes a success message and an HTTP status code
            indicating the nature of the success (e.g., 201 for created). On failure, it returns an error message
            and an HTTP status code indicating the nature of the failure (e.g., 400 for bad requests, 404 for
            account does not exist, 500 for internal server errors).
        """
        messages = AccountMessages()
        logger = logging.getLogger('django')
        try:
            serializer = TransferSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.validated_data
            services = AccountServices(data)
            services.create_transfer()
            payload = { 'message': messages.transfer_created }
            return Response(payload, status.HTTP_201_CREATED)
        except ValidationError:
            payload = { 'message': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except InsufficientFunds:
            payload = { 'message': messages.insufficient_funds }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'message': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)