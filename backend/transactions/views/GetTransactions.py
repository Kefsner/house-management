from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from transactions.messages import TransactionsMessages
from transactions.models import Transaction

import logging
import datetime

class GetTransactionsView(APIView):
    """
    View for getting all transactions of the current month.

    This view allows authenticated users to get all transactions of the current month. It returns a list of
    dictionaries, each containing a transaction. This class uses the IsAuthenticated permission class to ensure
    that only authenticated users can access the view.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        """
        Handle GET request to get all transactions of the current month.

        This method retrieves all transactions of the current month from the database and returns them as a list
        of dictionaries. It handles exceptions to return the appropriate HTTP response, including internal server
        errors.

        Args:
            request (Request): The DRF request object.

        Returns:
            Response: A DRF Response object. On success, it includes a list of dictionaries, each containing a
            transaction. On failure, it returns an error message and an HTTP status code indicating the nature
            of the failure (e.g., 500 for internal server errors).
        """
        messages = TransactionsMessages()
        logger = logging.getLogger('django')
        try:
            today = datetime.date.today()
            transactions = Transaction.objects.filter(date__month=today.month, date__year=today.year)
            payload = []
            for transaction in transactions:
                payload.append({
                    'id': transaction.id,
                    'type': transaction.category.type,
                    'date': transaction.date,
                    'value': transaction.value,
                    'description': transaction.description,
                    'category': transaction.category.name,
                    'subcategory': transaction.subcategory.name,
                    'account': transaction.account.name,
                })
            return Response(payload, status.HTTP_200_OK)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)