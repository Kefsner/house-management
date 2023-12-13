from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.contrib.auth.models import User
from django.http.response import HttpResponse
from django.http.request import HttpRequest

from core.logger import Logger

from user_authentication.messages import UserAuthenticationMessages
from user_authentication.services import UserAuthenticationServices

import traceback
import json

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request: HttpRequest) -> HttpResponse:
        messages = UserAuthenticationMessages()
        logger = Logger()

        try:
            data = json.loads(request.body)
            services = UserAuthenticationServices(data)
            return services.login()
        except (json.JSONDecodeError, KeyError):
            payload = { 'error': messages.bad_request }
            return Response(payload, status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            payload = { 'error': messages.invalid_credentials }
            return Response(payload, status.HTTP_401_UNAUTHORIZED)
        except:
            logger.log_error(traceback.format_exc())
            payload = { 'error': messages.internal_server_error }
            return Response(payload, status.HTTP_500_INTERNAL_SERVER_ERROR)