from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from creditcard_management.messages import CreditCardMessages
from creditcard_management.services import CreditCardServices
from creditcard_management.models import CreditCard

import logging
import datetime

class GetCreditCardsView(APIView):
    """
    View for getting all credit cards.

    This view allows authenticated users to get all credit cards. It returns a list of dictionaries,
    each containing a credit card. This class uses the IsAuthenticated permission class to ensure that only
    authenticated users can access the view.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request: Request) -> Response:
        """
        Handle GET request to get all credit cards.

        This method retrieves all credit cards from the database and returns them as a list of dictionaries.
        It handles exceptions to return the appropriate HTTP response, including internal server errors.

        Args:
            request (Request): The DRF request object.

        Returns:
            Response: A DRF Response object. On success, it includes a list of dictionaries, each containing
            a credit card. On failure, it returns an error message and an HTTP status code indicating the nature
            of the failure (e.g., 500 for internal server errors).
        """
        messages = CreditCardMessages()
        logger = logging.getLogger('django')
        try:
            credit_cards = CreditCard.objects.all()
            payload = []
            for credit_card in credit_cards:
                payload.append({
                    'id': credit_card.id,
                    'name': credit_card.name,
                    'account': credit_card.account.name,
                    'limit': credit_card.limit,
                    'due_date': CreditCardServices.get_due_date(credit_card.due_day, datetime.date.today()),
                    'closing_date': CreditCardServices.get_due_date(credit_card.due_day, datetime.date.today()) - datetime.timedelta(days=7),
                    'remaining_limit': credit_card.remaining_limit,
                })
            return Response(payload, status.HTTP_200_OK)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)