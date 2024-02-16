from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from finances.serializers import CreditCardTransactionSerializer
from finances.services import CreditCardTransactionServices
from finances.messages import FinancesMessages

from core.exceptions import SerializerError
from core.logger import Logger

import traceback
import json

class CreateCreditCardTransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        messages = FinancesMessages()
        logger = Logger()
        try:
            data = json.loads(request.body)
            serializer = CreditCardTransactionSerializer(data=data)
            if not serializer.is_valid():
                logger.log_serializer_errors(serializer.errors)
                raise SerializerError
            services = CreditCardTransactionServices(data)
            payload = services.create_credit_card_transaction()
            return Response(payload, status.HTTP_201_CREATED)
        except (json.JSONDecodeError, KeyError, SerializerError):
            payload = { 'error': messages.bad_request }
            print(traceback.format_exc())
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)