from core.messages import CoreMessages
from user_authentication.constants import *

class UserAuthenticationMessages(CoreMessages):
    _login_success = 'Login realizado com sucesso'
    _logout_success = 'Logout realizado com sucesso'
    _invalid_credentials = 'Credenciais inválidas'
    _register_success = 'Usuário registrado com sucesso'
    _username_length_invalid = f'O nome de usuário deve ter entre {MIN_USERNAME_LENGHT} e {MAX_USERNAME_LENGHT} caracteres'
    _password_length_invalid = f'A senha deve ter entre {MIN_PASSWORD_LENGHT} e {MAX_PASSWORD_LENGHT} caracteres'
    _passwords_do_not_match = 'As senhas não coincidem'
    _username_already_exists = 'Username já existe'
    _password_has_no_uppercase = 'A senha deve conter pelo menos uma letra maiúscula'
    _password_has_no_lowercase = 'A senha deve conter pelo menos uma letra minúscula'
    _password_has_no_number = 'A senha deve conter pelo menos um número'
    _password_has_no_special_char = 'A senha deve conter pelo menos um caractere especial'
    _password_has_space = 'A senha não deve conter espaços'

    @property
    def login_success(self):
        return self._login_success
    
    @property
    def logout_success(self):
        return self._logout_success

    @property
    def invalid_credentials(self):
        return self._invalid_credentials

    @property
    def register_success(self):
        return self._register_success
    
    @property
    def username_length_invalid(self):
        return self._username_length_invalid
    
    @property
    def password_length_invalid(self):
        return self._password_length_invalid
    
    @property
    def username_already_exists(self):
        return self._username_already_exists
    
    @property
    def passwords_do_not_match(self):
        return self._passwords_do_not_match
    
    @property
    def password_has_no_uppercase(self):
        return self._password_has_no_uppercase
    
    @property
    def password_has_no_lowercase(self):
        return self._password_has_no_lowercase
    
    @property
    def password_has_no_number(self):
        return self._password_has_no_number
    
    @property
    def password_has_no_special_char(self):
        return self._password_has_no_special_char
    
    @property
    def password_has_space(self):
        return self._password_has_space
