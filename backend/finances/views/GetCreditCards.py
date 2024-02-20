from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from finances.services import CreditCardServices
from finances.messages import FinancesMessages
from finances.models import CreditCard

from core.logger import Logger

import traceback
import datetime

class GetCreditCardsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        messages = FinancesMessages()
        logger = Logger()
        try:
            credit_cards = CreditCard.objects.all()
            payload = []
            due_date = CreditCardServices.get_due_date(3, datetime.date.today())
            closing_date = due_date - datetime.timedelta(days=7)
            for credit_card in credit_cards:
                payload.append({
                    'id': credit_card.id,
                    'name': credit_card.name,
                    'account': credit_card.account.name,
                    'limit': credit_card.limit,
                    'closing_date': closing_date,
                    'due_date': due_date,
                    'remaining_limit': credit_card.remaining_limit,
                })
            return Response(payload, status.HTTP_200_OK)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)