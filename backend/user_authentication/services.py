from django.contrib.auth.models import User

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

from user_authentication.exceptions import *

class AuthServices:
    """
    Service class for handling authentication logic.

    Provides methods to generate JWT tokens and perform user login authentication,
    including setting the refresh token as an HttpOnly cookie.
    """

    def __init__(self, data: dict) -> None:
        """
        Initialize the AuthServices instance with user credentials.

        Args:
            data (dict): A dictionary containing 'username' and 'password' keys.
        """
        self.username = data['username'].lower()
        self.password = data['password']

    def generate_tokens(self, user: User) -> dict:
        """
        Generate JWT access and refresh tokens for a given user.

        Args:
            user (User): The user instance for whom to generate tokens.

        Returns:
            dict: A dictionary containing 'refresh' and 'access' tokens.
        """
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

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
        response = Response(tokens['access'], status=status.HTTP_200_OK)
        response.set_cookie(
            key='refresh_token',
            value=tokens['refresh'],
            httponly=True,
            secure=True,
            path='/auth/refresh/',
            samesite='Lax',
        )
        return response