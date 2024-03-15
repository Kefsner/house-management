from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from transactions.serializers import TransactionSerializer
from transactions.services import TransactionServices
from transactions.messages import TransactionsMessages

import logging

class CreateTransactionView(APIView):
    """
    View for creating a transaction.

    This view allows authenticated users to create a transaction. It uses the IsAuthenticated permission class
    to ensure that only authenticated users can access the view.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        """
        Handle POST request to create a transaction.

        This method validates the provided data using the TransactionSerializer and creates a transaction
        using the TransactionServices. It handles various exceptions to return the appropriate HTTP response,
        including bad requests and internal server errors.

        Args:
            request (Request): The DRF request object containing transaction data.

        Returns:
            Response: A DRF Response object. On success, it includes a success message and an HTTP status code
            indicating the nature of the success (e.g., 201 for created). On failure, it returns an error message
            and an HTTP status code indicating the nature of the failure (e.g., 400 for bad requests, 500 for
            internal server errors).
        """
        messages = TransactionsMessages()
        logger = logging.getLogger('django')
        try:
            serializer = TransactionSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.validated_data
            services = TransactionServices(data)
            services.create_transaction()
            payload = { 'message': messages.transaction_created }
            return Response(payload, status.HTTP_201_CREATED)
        except ValidationError:
            payload = { 'message': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'message': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)