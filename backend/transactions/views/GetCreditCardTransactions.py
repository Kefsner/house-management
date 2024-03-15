from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from transactions.messages import TransactionsMessages

from creditcard_management.models import CreditCard

import logging

class GetCreditCardTransactionsView(APIView):
    """
    View for getting credit card transactions.

    This view allows authenticated users to get transactions of a credit card. It returns a list of dictionaries,
    each containing a transaction. This class uses the IsAuthenticated permission class to ensure that only
    authenticated users can access the view. 
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request: Request, credit_card_id: int) -> Response:
        """
        Handle GET request to get transactions of a credit card.

        This method retrieves all transactions of a credit card from the database and returns them as a list of
        dictionaries. It handles exceptions to return the appropriate HTTP response, including internal server
        errors.

        Args:
            request (Request): The DRF request object.
            credit_card_id (int): The ID of the credit card whose transactions are to be retrieved.

        Returns:
            Response: A DRF Response object. On success, it includes a list of dictionaries, each containing a
            transaction. On failure, it returns an error message and an HTTP status code indicating the nature
            of the failure (e.g., 500 for internal server errors).
        """
        messages = TransactionsMessages()
        logger = logging.getLogger('django')
        try:
            credit_card = CreditCard.objects.get(id=credit_card_id)
            transactions = credit_card.transactions.all()
            payload = []
            for transaction in transactions:
                payload.append({
                    'id': transaction.id,
                    'date': transaction.date,
                    'value': transaction.value,
                    'installments': [
                        {
                        "id": installments.id,
                        "value": installments.value,
                        "due_date": installments.due_date,
                        "paid": installments.paid,
                        "installment_number": installments.installment_number,
                        } for installments in transaction.transaction_installments.all()
                    ],
                    'description': transaction.description,
                    'category': transaction.category.name,
                    'subcategory': transaction.subcategory.name if transaction.subcategory else None,
                })
            return Response(payload, status.HTTP_200_OK)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)