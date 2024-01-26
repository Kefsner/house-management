from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from finances.models import Category

class GetCategoriesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:                
            categories = Category.objects.all()
            payload = []
            for category in categories:
                payload.append({
                    'id': category.id,
                    'name': category.description
                })
            return Response(payload)
        except:
            return Response(status=500)