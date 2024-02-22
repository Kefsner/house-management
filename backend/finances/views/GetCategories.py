from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from finances.messages import FinancesMessages
from finances.models import Category


import traceback

class GetCategoriesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        messages = FinancesMessages()
        try:
            categories = Category.objects.all()
            payload = []
            for category in categories:
                subcategories = category.subcategory_set.all()
                payload.append({
                    'id': category.id,
                    'type': category.type,
                    'name': category.name,
                    'subcategories': [{'name': subcategory.name, 'id': subcategory.id} for subcategory in subcategories]
                })
            return Response(payload, status.HTTP_200_OK)
        except (KeyError):
            payload = { 'error': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except:
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)
