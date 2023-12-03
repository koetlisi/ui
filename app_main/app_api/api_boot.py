import requests
from django.shortcuts import redirect
from rest_framework import status
from rest_framework.response import Response

from app_main.app_api.headers.header import headers
from app_main.settings.globals import my_api


def boot(request, api, data):
    response = Response()
    token = request.COOKIES.get('laravel_token')
    try:
        api_response = requests.post(my_api + api, json=data, headers=headers(token))
        api_response.raise_for_status()
        return Response(api_response.json(), status=status.HTTP_200_OK)
    except requests.exceptions.HTTPError as err:
        error_message = err.response.json()['message']
        if error_message == 'Unauthenticated.':  # Redirect to some page after deleting cookies
            response.delete_cookie('laravel_token')
            response.delete_cookie('access_token')
            return Response({"code": 511, "message": "Unauthorized. Clear cookies and reload the page."},
                            status=status.HTTP_200_OK)
        return Response(err.response.text, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
