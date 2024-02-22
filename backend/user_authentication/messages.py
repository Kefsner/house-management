from core.messages import CoreMessages

class UserAuthenticationMessages(CoreMessages):
    _invalid_credentials = 'Invalid credentials.'
    _authentication_error = 'An error occurred during authentication.'
    _logout_success = 'User has been logged out successfully.'

    @property
    def invalid_credentials(self):
        return self._invalid_credentials
    
    @property
    def authentication_error(self):
        return self._authentication_error
    
    @property
    def logout_success(self):
        return self._logout_success