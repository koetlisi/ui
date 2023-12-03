from rest_framework.response import Response
from rest_framework import status
import requests
from rest_framework.views import APIView
from app_main.app_api.headers.header import headers
from ..api_boot import boot
from ...functions.create_barcode import create_barcode
from ...functions.generate_unique_ean13 import generate_unique_ean13
from ...functions.upload_file_and_return_path import upload_file_and_return_path
from ...settings.globals import my_api


class AnalyticMethodRegistrationAPI(APIView):
    @staticmethod
    def post(request):
        response = Response()
        token = request.COOKIES.get('laravel_token')
        data = request.POST.copy()
        data['notes'] = upload_file_and_return_path('notes', request.FILES['notes'])
        return boot(request, '/api/analytical/method/registration', data)
