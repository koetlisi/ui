import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..headers.header import headers
from ...functions.create_barcode import create_barcode
from ...functions.generate_unique_ean13 import generate_unique_ean13
from ...settings.globals import my_api


class AnalyteUnitsRegistrationAPI(APIView):
    @staticmethod
    def post(request):
        token = request.COOKIES.get('laravel_token')

        data = {
            'name': request.data.get('name'),
            'shot_name': request.data.get('shot_name'),
        }

        try:
            api_response = requests.post(my_api + '/api/analyte/unit/registration', json=data,
                                         headers=headers(token))
            api_response.raise_for_status()
            return Response(api_response.json(), status=status.HTTP_200_OK)
        except requests.exceptions.HTTPError as err:
            print(err.response.text)
            return Response(err.response.text, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

