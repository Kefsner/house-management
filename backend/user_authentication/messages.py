from core.messages import CoreMessages
from user_authentication.constants import *

class UserAuthenticationMessages(CoreMessages):
    _invalid_credentials = 'Invalid credentials.'

    @property
    def invalid_credentials(self):
        return self._invalid_credentials