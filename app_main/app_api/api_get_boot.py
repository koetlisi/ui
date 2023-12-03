import requests
from rest_framework import status
from rest_framework.response import Response

from app_main.app_api.headers.header import headers
from app_main.settings.globals import my_api


def boot_get(request, api, data):
    response = Response()
    token = request.COOKIES.get('laravel_token')
    try:
        api_response = requests.get(my_api + api, json=data, headers=headers(token))
        api_response.raise_for_status()
        response.data = api_response.json()
        return response
    except requests.exceptions.HTTPError as e:
        error_code = api_response.status_code if 'api_response' in locals() else status.HTTP_500_INTERNAL_SERVER_ERROR
        error_message = f'HTTP error occurred: {str(e)}'
        return Response({'code': error_code, 'msg': error_message, 'data': {}}, status=error_code)

    except requests.exceptions.ConnectionError as e:
        error_message = f'Error connecting to the server: {str(e)}'
        return Response({'code': status.HTTP_500_INTERNAL_SERVER_ERROR, 'msg': error_message, 'data': {}},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except requests.exceptions.Timeout as e:
        error_message = f'Request timed out: {str(e)}'
        return Response({'code': status.HTTP_408_REQUEST_TIMEOUT, 'msg': error_message, 'data': {}},
                        status=status.HTTP_408_REQUEST_TIMEOUT)

    except requests.exceptions.RequestException as e:
        error_message = f'Error: {str(e)}'
        return Response({'code': status.HTTP_500_INTERNAL_SERVER_ERROR, 'msg': error_message, 'data': {}},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        error_message = f'An unexpected error occurred: {str(e)}'
        return Response({'code': status.HTTP_500_INTERNAL_SERVER_ERROR, 'msg': error_message, 'data': {}},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
