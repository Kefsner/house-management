from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from creditcard_management.serializers import CreditCardTransactionSerializer
from creditcard_management.services import CreditCardServices
from creditcard_management.messages import CreditCardMessages

import logging

class CreateCreditCardTransactionView(APIView):
    """
    View for creating a credit card transaction.

    This view allows authenticated users to create a credit card transaction. It uses the IsAuthenticated permission class
    to ensure that only authenticated users can access the view.
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request: Request, credit_card_id: int) -> Response:
        """
        Handle POST request to create a credit card transaction.

        This method validates the provided data using the CreditCardTransactionSerializer and creates a credit card transaction
        using the CreditCardTransactionServices. It handles various exceptions to return the appropriate HTTP response,
        including bad requests and internal server errors.

        Args:
            request (Request): The DRF request object containing credit card transaction data.
            credit_card_id (int): The ID of the credit card to which the transaction belongs.

        Returns:
            Response: A DRF Response object. On success, it includes a success message and an HTTP status code
            indicating the nature of the success (e.g., 201 for created). On failure, it returns an error message
            and an HTTP status code indicating the nature of the failure (e.g., 400 for bad requests, 500 for
            internal server errors).
        """
        messages = CreditCardMessages()
        logger = logging.getLogger('django')
        try:
            serializer = CreditCardTransactionSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.validated_data
            services = CreditCardServices(data, credit_card_id)
            services.create_credit_card_transaction()
            payload = { 'message': messages.credit_card_transaction_created }
            return Response(payload, status.HTTP_201_CREATED)
        except ValidationError:
            payload = { 'message': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'message': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)