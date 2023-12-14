from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from user_authentication.messages import UserAuthenticationMessages

from core.logger import Logger

import traceback

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        messages = UserAuthenticationMessages()
        logger = Logger()
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            payload = { 'success': messages.logout_success }
            return Response(payload, status.HTTP_200_OK)
        except TokenError:
            payload = { 'error': messages.token_error }
            logger.log_error(traceback.format_exc())
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except Exception:
            logger.log_error(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)