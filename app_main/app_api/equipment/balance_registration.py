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


class BalanceReagentRegistrationAPI(APIView):
    @staticmethod
    def post(request):
        generate_ean13 = generate_unique_ean13()
        barcode_path = create_barcode(generate_ean13)
        data = request.POST.copy()
        data['barcode'] = generate_ean13
        data['barcode_path'] = barcode_path
        data['user_manual'] = upload_file_and_return_path('user_manual', request.FILES['user_manual'])
        data['calibration_cert'] = upload_file_and_return_path("msds", request.FILES['calibration_cert'])
        return boot(request, '/api/equipment/registration', data)
