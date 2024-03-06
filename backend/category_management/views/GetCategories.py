from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from category_management.messages import CategoryMessages
from category_management.models import Category

import logging

class GetCategoriesView(APIView):
    """
    View for getting all categories and subcategories.

    This view allows authenticated users to get all categories and subcategories. It returns a list of
    dictionaries, each containing a category and its subcategories. This class uses the IsAuthenticated
    permission class to ensure that only authenticated users can access the view.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        """
        Handle GET request to get all categories and subcategories.

        This method retrieves all categories and their subcategories from the database and returns them
        as a list of dictionaries. It handles exceptions to return the appropriate HTTP response, including
        internal server errors.

        Args:
            request (Request): The DRF request object.

        Returns:
            Response: A DRF Response object. On success, it includes a list of dictionaries, each containing
            a category and its subcategories. On failure, it returns an error message and an HTTP status code
            indicating the nature of the failure (e.g., 500 for internal server errors).
        """
        messages = CategoryMessages()
        logger = logging.getLogger('django')
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
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)
