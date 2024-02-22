from core.messages import CoreMessages

class UserManagementMessages(CoreMessages):
    _user_already_exists = 'Usuário já existe'
    _user_created = 'Usuário criado com sucesso'
    _passwords_do_not_match = 'As senhas não coincidem'
    _password_has_space = 'A senha não pode conter espaços'
    _password_has_no_uppercase = 'A senha deve conter pelo menos uma letra maiúscula'
    _password_has_no_lowercase = 'A senha deve conter pelo menos uma letra minúscula'
    _password_has_no_number = 'A senha deve conter pelo menos um número'
    _password_has_no_special_char = 'A senha deve conter pelo menos um caractere especial'

    @property
    def user_already_exists(self):
        return self._user_already_exists
    
    @property
    def user_created(self):
        return self._user_created
    
    @property
    def passwords_do_not_match(self):
        return self._passwords_do_not_match
    
    @property
    def password_has_space(self):
        return self._password_has_space
    
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

