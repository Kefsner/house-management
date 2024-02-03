from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from finances.messages import FinancesMessages
from finances.models import Transaction

from core.logger import Logger

import traceback

class GetTransactionsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        messages = FinancesMessages()
        logger = Logger()
        try:
            transactions = Transaction.objects.all()
            payload = []
            for transaction in transactions:
                payload.append({
                    'id': transaction.id,
                    'type': transaction.category.type,
                    'value': transaction.value,
                    'date': transaction.date,
                    'description': transaction.description,
                    'category': transaction.category.name,
                    'subcategory': transaction.subcategory.name
                })
            return Response(payload, status.HTTP_200_OK)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)