from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from core.logger import Logger
from core.exceptions import SerializerError, InvalidPassword, UserAlreadyExists

from user_authentication.serializers import RegisterSerializer
from user_authentication.services import AuthServices
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
            services = AuthServices(data)
            payload = services.register()
            return Response(payload, status.HTTP_201_CREATED)
        except (json.JSONDecodeError, KeyError, SerializerError, InvalidPassword) as e:
            if isinstance(e, InvalidPassword):
                payload = { 'error': e.args[0] }
            else:
                payload = { 'error': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except UserAlreadyExists:
            payload = { 'error': messages.username_already_exists }
            return Response(payload, status.HTTP_409_CONFLICT)
        except:
            logger.log_tracebak(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)