from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from finances.messages import FinancesMessages
from finances.models import Category

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
                    'name': category.name,
                    'type': category.type,
                    'subcategories': [{'id': subcategory.id, 'name': subcategory.name, 'description': subcategory.description} for subcategory in subcategories]
                })
            return Response(payload, status.HTTP_200_OK)
        except:
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)
