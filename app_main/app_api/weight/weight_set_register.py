import json

import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..api_boot import boot
from ..headers.header import headers
from ...functions.generate_unique_ean13 import generate_unique_ean13
from ...functions.create_barcode import create_barcode
from ...functions.upload_file_and_return_path import upload_file_and_return_path
from ...settings.globals import my_api


class WeightSetRegistrationAPI(APIView):
    @staticmethod
    def post(request):
        generate_ean13 = generate_unique_ean13()
        barcode_path = create_barcode(generate_ean13)
        data = {
            'name': request.data.get('name'),
            'material': request.data.get('material'),
            'manufacture': request.data.get('manufacture'),
            'serial_num': request.data.get('serial_num'),
            'storage': request.data.get('storage'),
            'description': request.data.get('description'),
            'weights': request.POST.getlist('weights[]'),
            'barcode_path': barcode_path,
            'barcode': generate_ean13,
            'documentation': upload_file_and_return_path('document', request.FILES['document'])
        }
        return boot(request, '/api/weight/set/registration', data)
