from rest_framework.response import Response
from rest_framework import status
import requests
from rest_framework.views import APIView
from app_main.app_api.headers.header import headers
from ...functions.create_barcode import create_barcode
from ...functions.generate_unique_ean13 import generate_unique_ean13
from ...functions.upload_file_and_return_path import upload_file_and_return_path
from ...settings.globals import my_api


class SamplePreparationMethodRegistrationAPI(APIView):
    @staticmethod
    def post(request):
        response = Response()
        token = request.COOKIES.get('laravel_token')
        data = request.POST.copy()
        data['notes_path'] = upload_file_and_return_path('notes', request.FILES['notes'])
        try:
            api_response = requests.post(my_api + '/api/sample/preparation/method/registration', json=data,
                                         headers=headers(token))
            api_response.raise_for_status()
            response.data = api_response.json()
            return response

        except requests.exceptions.HTTPError as e:
            error_message = f'HTTP error occurred: {str(e)}'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except requests.exceptions.ConnectionError as e:
            error_message = f'Error connecting to the server: {str(e)}'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except requests.exceptions.Timeout as e:
            error_message = f'Request timed out: {str(e)}'
            return Response({'message': error_message}, status=status.HTTP_408_REQUEST_TIMEOUT)
        except requests.exceptions.RequestException as e:
            error_message = f'Error: {str(e)}'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = f'An unexpected error occurred: {str(e)}'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)