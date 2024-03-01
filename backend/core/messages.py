class CoreMessages:
    _bad_request = 'Requisição mal formada'
    _internal_server_error = 'Erro interno do servidor'
    _integrity_error = 'Erro de integridade no banco de dados'
    
    @property
    def bad_request(self):
        return self._bad_request

    @property
    def internal_server_error(self):
        return self._internal_server_error
    
    @property
    def integrity_error(self):
        return self._integrity_error