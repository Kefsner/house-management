from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from account_management.messages import AccountMessages
from account_management.models import Account

import logging

class GetAccountsView(APIView):
    """
    View for getting all accounts.

    This view allows authenticated users to get all accounts. It returns a list of dictionaries,
    each containing an account. This class uses the IsAuthenticated permission class to ensure that only
    authenticated users can access the view.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        """
        Handle GET request to get all accounts.

        This method retrieves all accounts from the database and returns them as a list of dictionaries.
        It handles exceptions to return the appropriate HTTP response, including internal server errors.

        Args:
            request (Request): The DRF request object.

        Returns:
            Response: A DRF Response object. On success, it includes a list of dictionaries, each containing
            an account. On failure, it returns an error message and an HTTP status code indicating the nature
            of the failure (e.g., 500 for internal server errors).
        """
        messages = AccountMessages()
        logger = logging.getLogger('django')
        try:
            accounts = Account.objects.all()
            payload = []
            for account in accounts:
                payload.append({
                    'id': account.id,
                    'name': account.name,
                    'balance': account.balance,
                    'user': account.user.username.capitalize(),
                })
            return Response(payload, status.HTTP_200_OK)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)