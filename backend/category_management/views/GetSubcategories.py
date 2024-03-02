from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from finances.messages import FinancesMessages
from finances.models import Category, Subcategory

class GetSubcategoriesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, category_id):
        messages = FinancesMessages()
        try:
            category = Category.objects.get(id=category_id)
            subcategories = Subcategory.objects.filter(category=category)
            payload = []
            for subcategory in subcategories:
                payload.append({
                    'id': subcategory.id,
                    'name': subcategory.name,
                    'description': subcategory.description
                })
            return Response(payload, status.HTTP_200_OK)
        except:
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)