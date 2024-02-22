from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from user_authentication.messages import UserAuthenticationMessages
from user_authentication.exceptions import NoRefreshToken

import logging

class RefreshView(APIView):
    """
    View for handling access token refresh requests.

    Allows any user with a valid refresh token to request a new access token.
    The refresh token must be provided in the request's cookies. If the refresh
    process is successful, a new access token is returned and the refresh token
    is reset in the cookies.
    """
    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        """
        Handle POST request to refresh an access token.

        Extracts the refresh token from the request cookies. If a valid refresh
        token is found, issues a new access token and returns it in the response.
        The refresh token itself is securely reset in the response cookies.

        Args:
            request (Request): The DRF request object.

        Returns:
            Response: DRF Response object with a new access token on success or
            an error message and status code on failure.
        """
        messages = UserAuthenticationMessages()
        logger = logging.getLogger('django')
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            print("refresh_token: ", refresh_token)
            if not refresh_token:
                raise NoRefreshToken
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            response = Response({
                'accessToken': access_token,
            }, status=status.HTTP_200_OK)
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                # secure=True,
                path='/',
                samesite='Lax',
            )
            return response
        except NoRefreshToken:
            payload = {'message': messages.authentication_error}
            return Response(payload, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            logger.error(e, exc_info=True)
            payload = {'message': messages.authentication_error}
            return Response(payload, status=status.HTTP_401_UNAUTHORIZED)