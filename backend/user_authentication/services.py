from django.contrib.auth.models import User

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

from core.services import BaseAuthServices

from user_authentication.exceptions import *

class AuthServices(BaseAuthServices):
    """
    Service class for handling authentication logic.

    Provides methods to generate JWT tokens and perform user login authentication,
    including setting the refresh token as an HttpOnly cookie.

    Attributes:
        username (str): The username of the user attempting to log in.
        password (str): The password of the user attempting to log in.
    """
    def __init__(self, data: dict) -> None:
        """
        Initialize the AuthServices instance with user credentials.

        Args:
            data (dict): A dictionary containing 'username' and 'password' keys.
        """
        self.username = data['username'].lower()
        self.password = data['password']

    def login(self) -> Response:
        """
        Authenticate the user and return the login response.

        Validates the user's password, generates JWT tokens upon successful
        authentication, sets the refresh token as an HttpOnly cookie, and
        returns the access token in the response body.

        Raises:
            InvalidCredentials: If the password check fails.
            User.DoesNotExist: If the user does not exist.

        Returns:
            Response: The HTTP response containing the access token or an error.
        """
        user = User.objects.get(username=self.username)
        if not user.check_password(self.password):
            raise InvalidCredentials()
        tokens = self.generate_tokens(user)
        payload = {
            'accessToken': tokens['access'],
            'username': user.username,
        }
        response = Response(payload, status=status.HTTP_200_OK)
        response.set_cookie(
            key='refresh_token',
            value=tokens['refresh'],
            httponly=True,
            # secure=True,
            path='/',
            samesite='Lax',
        )
        return response
