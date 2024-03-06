from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from django.db import IntegrityError

from category_management.serializers import CategorySerializer
from category_management.messages import CategoryMessages
from category_management.services import CategoryServices

import logging

class CreateCategoryView(APIView):
    """
    View for creating a category.

    This view allows authenticated users to create a category. It uses the IsAuthenticated permission class
    to ensure that only authenticated users can access the view.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        """
        Handle POST request to create a category.

        This method validates the provided data using the CategorySerializer and creates a category
        using the CategoryServices. It handles various exceptions to return the appropriate HTTP response,
        including bad requests, integrity errors, and internal server errors.

        Args:
            request (Request): The DRF request object containing category data.

        Returns:
            Response: A DRF Response object. On success, it includes a success message and an HTTP status code
            indicating the nature of the success (e.g., 201 for created). On failure, it returns an error message
            and an HTTP status code indicating the nature of the failure (e.g., 400 for bad requests, 409 for
            integrity errors, 500 for internal server errors).
        """
        messages = CategoryMessages()
        logger = logging.getLogger('django')
        try:
            serializer = CategorySerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.validated_data
            services = CategoryServices(data)
            services.create_category()
            payload = { 'message': messages.category_created }
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