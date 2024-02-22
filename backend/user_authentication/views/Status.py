from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from user_authentication.messages import UserAuthenticationMessages

import logging

class StatusView(APIView):
    """
    A view that checks and returns the authentication status of the user.

    This view requires the user to be authenticated to access it. Upon a GET request,
    it responds with a greeting message to the authenticated user. If the user cannot
    be authenticated or any other exception occurs, an appropriate error message is returned.

    Permissions:
        IsAuthenticated: Ensures that only authenticated users can access this view.

    Responses:
        200 OK: Returns a greeting message including the username of the authenticated user.
        500 Internal Server Error: Returns an error message if an exception occurs.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        messages = UserAuthenticationMessages()
        logger = logging.getLogger('django')
        try:
            user = request.user
            payload = {'message': f'Hello, {user.username}!'}
            return Response(payload, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = {'message': messages.authentication_error}
            return Response(payload, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
