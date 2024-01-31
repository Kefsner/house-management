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
            incomes = []
            expenses = []
            for transaction in transactions:
                if transaction.category.type == 'I':
                    incomes.append(transaction.value)
                else:
                    expenses.append(transaction.value)
            payload = {
                'incomes': sum(incomes),
                'expenses': sum(expenses)
            }
            return Response(payload, status.HTTP_200_OK)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)