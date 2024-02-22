from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from finances.messages import FinancesMessages
from finances.models import Transaction


import traceback
import datetime

class GetTransactionsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        messages = FinancesMessages()
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
        except:
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)