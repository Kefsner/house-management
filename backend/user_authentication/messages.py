from core.messages import CoreMessages

class UserAuthenticationMessages(CoreMessages):
    _login_success = 'Login realizado com sucesso'
    _invalid_password = 'Senha inválida'
    _user_not_found = 'Usuário não encontrado'

    @property
    def login_success(self):
        return self._login_success

    @property
    def invalid_password(self):
        return self._invalid_password
    
    @property
    def user_not_found(self):
        return self._user_not_found