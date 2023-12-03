import requests
from django.http import JsonResponse
from ..settings.globals import my_api


def login_api_calling(email, password, token):
    data = {
        'email': email,
        'password': password,
        'token': token
    }
    try:
        response = requests.post(my_api + '/api/user/login', data=data)
        return response.json()
    except requests.exceptions.RequestException as e:
        return JsonResponse({'message': f'Error: {str(e)}'})
