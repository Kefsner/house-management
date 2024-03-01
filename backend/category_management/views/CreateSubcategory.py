from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.db import IntegrityError

from category_management.serializers import SubcategorySerializer
from category_management.services import SubcategoryServices
from category_management.messages import SubcategoryMessages

import logging

class CreateSubcategoryView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        messages = SubcategoryMessages()
        logger = logging.getLogger('django')
        try:
            print(request.data)
            serializer = SubcategorySerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.validated_data
            services = SubcategoryServices(data)
            services.create_subcategory()
            payload = { 'message': messages.subcategory_created }
            return Response(payload, status.HTTP_201_CREATED)
        except ValidationError:
            payload = { 'message': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            payload = { 'message': messages.integrity_error }
            return Response(payload, status.HTTP_409_CONFLICT)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'message': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)