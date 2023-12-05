from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase


class LoginViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='test_user',
            password='test_password'
        )

    def test_login_success(self):
        response = self.client.post(
            '/auth/login/',
            {
                'username': 'test_user',
                'password': 'test_password'
            },
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'Login realizado com sucesso')

    def test_invalid_password(self):
        response = self.client.post(
            '/auth/login/',
            {
                'username': 'test_user',
                'password': 'invalid_password'
            },
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data, 'Senha inválida')

    def test_user_not_found(self):
        response = self.client.post(
            '/auth/login/',
            {
                'username': 'invalid_user',
                'password': 'test_password'
            },
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, 'Usuário não encontrado')

    def test_additional_field(self):
        response = self.client.post(
            '/auth/login/',
            {
                'username': 'test_user',
                'password': 'test_password',
                'additional_field': 'additional_value'
            },
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'Login realizado com sucesso')

    def test_bad_request(self):
        response = self.client.post(
            '/auth/login/',
            {
                'username': 'test_user'
            },
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, 'Requisição mal formada')