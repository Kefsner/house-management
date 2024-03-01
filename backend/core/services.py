from django.contrib.auth.models import User

from rest_framework_simplejwt.tokens import RefreshToken

class BaseAuthServices:
    """
    Base class for authentication services.

    Provides methods for generating and refreshing JWT tokens.
    """

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
    
    def refresh_tokens(self, refresh_token: str) -> dict:
        """
        Generate new access and refresh tokens from a given refresh token.

        Args:
            refresh_token (str): The refresh token to refresh.

        Returns:
            dict: A dictionary containing 'refresh' and 'access' tokens.
        """
        refresh = RefreshToken(refresh_token)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
