from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from core.logger import Logger
from core.exceptions import SerializerError

from user_authentication.serializers import RegisterSerializer
from user_authentication.services import UserAuthenticationServices
from user_authentication.messages import UserAuthenticationMessages

import traceback
import json

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request: Request) -> Response:
        messages = UserAuthenticationMessages()
        logger = Logger()

        try:
            data = json.loads(request.body)
            serializer = RegisterSerializer(data=data)
            if not serializer.is_valid():
                logger.log_serializer_errors(serializer.errors)
                raise SerializerError
            services = UserAuthenticationServices(data)
            return services.register()
        except (json.JSONDecodeError, KeyError, SerializerError):
            payload = { 'error': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)