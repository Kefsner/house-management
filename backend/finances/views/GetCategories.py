from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from finances.models import Category

class GetCategoriesView(APIView):
    """
    View to get all categories.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Return a list of all categories.
        """
        categories = Category.objects.all()
        payload = []
        for category in categories:
            payload.append({
                'id': category.id,
                'name': category.name
            })
        return Response(payload)