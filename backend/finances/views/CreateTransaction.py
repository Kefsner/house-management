from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from finances.messages import TransactionMessages
from finances.services import TransactionServices

from core.logger import Logger

import traceback
import json

class CreateTransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        messages = TransactionMessages()
        logger = Logger()
        try:
            data = json.loads(request.body)
            services = TransactionServices(data)
            return services.create_transaction()
        except (json.JSONDecodeError, KeyError):
            payload = { 'error': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)