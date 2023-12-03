import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..api_boot import boot
from ..headers.header import headers
from ...functions.create_barcode import create_barcode
from ...functions.generate_unique_ean13 import generate_unique_ean13
from ...settings.globals import my_api


class AnalyteRegisterAPI(APIView):
    @staticmethod
    def post(request):
        token = request.COOKIES.get('laravel_token')

        data = {
            'name': request.data.get('name'),
            'chemical_name': request.data.get('chemical_name'),
        }
        return boot(request, '/api/analyte/registration', data)
       