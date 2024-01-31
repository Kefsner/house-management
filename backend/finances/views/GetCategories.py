from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from finances.messages import FinancesMessages
from finances.models import Category

from core.logger import Logger

import traceback

class GetCategoriesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        messages = FinancesMessages()
        logger = Logger()
        try:
            type = request.GET['type']
            categories = Category.objects.filter(type=type)
            payload = []
            for category in categories:
                payload.append({
                    'id': category.id,
                    'name': category.name
                })
            return Response(payload, status.HTTP_200_OK)
        except (KeyError):
            payload = { 'error': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)