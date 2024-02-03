from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from finances.messages import FinancesMessages
from finances.models import Category, Subcategory

from core.logger import Logger

import traceback
class GetSubcategoriesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        messages = FinancesMessages()
        logger = Logger()
        try:
            category_name = request.GET['category']
            category_type = request.GET['type'][0]
            category = Category.objects.get(name=category_name, type=category_type)
            subcategories = Subcategory.objects.filter(category=category)
            payload = []
            for subcategory in subcategories:
                payload.append({
                    'id': subcategory.id,
                    'name': subcategory.name,
                    'description': subcategory.description
                })
            return Response(payload, status.HTTP_200_OK)
        except (KeyError):
            payload = { 'error': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)