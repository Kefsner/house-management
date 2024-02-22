from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class StatusView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(status=status.HTTP_200_OK)