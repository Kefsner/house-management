from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from user_authentication.messages import UserAuthenticationMessages
from user_authentication.exceptions import NoRefreshToken

import logging

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        messages = UserAuthenticationMessages()
        logger = logging.getLogger('django')
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            print(refresh_token)
            if not refresh_token:
                raise NoRefreshToken
            token = RefreshToken(refresh_token)
            token.blacklist()
            payload = { 'success': messages.logout_success }
            return Response(payload, status.HTTP_200_OK)
        except NoRefreshToken:
            payload = { 'error': messages.authentication_error }
            return Response(payload, status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = { 'error': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)