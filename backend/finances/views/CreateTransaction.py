from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from finances.serializers import TransactionSerializer
from finances.messages import FinancesMessages

from core.exceptions import SerializerError
from core.logger import Logger

import traceback
import json

class CreateTransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        messages = FinancesMessages()
        logger = Logger()
        try:
            data = json.loads(request.body)
            serializer = TransactionSerializer(data=data)
            if not serializer.is_valid():
                logger.log_serializer_errors(serializer.errors)
                raise SerializerError
            return
        except (json.JSONDecodeError, KeyError, SerializerError):
            payload = { 'error': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)