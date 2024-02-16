from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from finances.messages import FinancesMessages
from finances.models import CreditCard

from core.logger import Logger

import traceback

class GetCreditCardTransactionsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, credit_card_id):
        messages = FinancesMessages()
        logger = Logger()
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
                        } for installments in transaction.transaction_installments.all()
                    ],
                    'description': transaction.description,
                    'category': transaction.category.name,
                    'subcategory': transaction.subcategory.name if transaction.subcategory else None,
                })
            return Response(payload, status.HTTP_200_OK)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)