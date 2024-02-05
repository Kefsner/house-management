from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from finances.messages import FinancesMessages
from finances.models import Account

from core.logger import Logger

import traceback

class GetAccountsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        messages = FinancesMessages()
        logger = Logger()
        try:
            accounts = Account.objects.all()
            payload = []
            for account in accounts:
                payload.append({
                    'id': account.id,
                    'name': account.name,
                    'balance': account.balance,
                    'user': account.user.id
                })
            return Response(payload, status.HTTP_200_OK)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)