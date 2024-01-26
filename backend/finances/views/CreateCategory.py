from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from core.exceptions import SerializerError

from finances.serializers import CategorySerializer
from finances.messages import TransactionMessages

from core.logger import Logger
import json
import traceback

class CreateCategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        messages = TransactionMessages()
        logger = Logger()
        try:
            data = json.loads(request.body)
            serializer = CategorySerializer(data=data)
            if not serializer.is_valid():
                logger.log_serializer_errors(serializer.errors)
                raise SerializerError
            services = CategoryServices(data)
            return services.create_category()
        except (json.JSONDecodeError, KeyError, SerializerError):
            payload = { 'error': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)