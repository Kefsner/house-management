class CoreMessages:
    _internal_server_error = 'Erro interno do servidor'
    _bad_request = 'Requisição mal formada'

    @property
    def internal_server_error(self):
        return self._internal_server_error
    
    @property
    def bad_request(self):
        return self._bad_request