from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from category_management.models import Category, Subcategory
from category_management.messages import CategoryMessages

import logging

class GetSubcategoriesView(APIView):
    """
    View for getting subcategories of a category.

    This view allows authenticated users to get subcategories of a category. It returns a list of dictionaries,
    each containing a subcategory. This class uses the IsAuthenticated permission class to ensure that only
    authenticated users can access the view. 
    """
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, category_id: int) -> Response:
        """
        Handle GET request to get subcategories of a category.

        This method retrieves all subcategories of a category from the database and returns them as a list of
        dictionaries. It handles exceptions to return the appropriate HTTP response, including internal server
        errors.

        Args:
            request (Request): The DRF request object.
            category_id (int): The ID of the category whose subcategories are to be retrieved.

        Returns:
            Response: A DRF Response object. On success, it includes a list of dictionaries, each containing a
            subcategory. On failure, it returns an error message and an HTTP status code indicating the nature
            of the failure (e.g., 500 for internal server errors).
        """
        messages = CategoryMessages()
        logger = logging.getLogger('django')
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
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'error': messages.internal_server_error }
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)